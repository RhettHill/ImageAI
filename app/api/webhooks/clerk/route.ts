import { clerkClient } from "@clerk/clerk-sdk-node";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

// Define UserJSON type locally since it might not be exported
type UserJSON = {
  id: string;
  email_addresses: Array<{ email_address: string }>;
  username?: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
};

export async function POST(req: Request): Promise<NextResponse> {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get headers (need to await)
  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  // Get and verify payload
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

  // CREATE
  if (eventType === "user.created") {
    const userData = evt.data as UserJSON;
    const newUser = await createUser({
      clerkId: userData.id,
      email: userData.email_addresses[0]?.email_address ?? "",
      username: userData.username ?? `user_${userData.id}`,
      firstName: userData.first_name ?? "",
      lastName: userData.last_name ?? "",
      photo: userData.image_url ?? "",
    });

    if (newUser) {
      try {
        await clerkClient.users.updateUserMetadata(userData.id, {
          publicMetadata: { userId: newUser._id },
        });
      } catch (clerkError) {
        console.error("Failed to update Clerk metadata:", clerkError);
        // Don't throw here, user creation was successful
      }
    }
    return NextResponse.json({ message: "OK", user: newUser });
  }

  // UPDATE
  if (eventType === "user.updated") {
    const userData = evt.data as UserJSON;
    const updatedUser = await updateUser(userData.id, {
      firstName: userData.first_name ?? "",
      lastName: userData.last_name ?? "",
      username: userData.username ?? "",
      photo: userData.image_url ?? "",
    });
    return NextResponse.json({ message: "OK", user: updatedUser });
  }

  // DELETE
  if (eventType === "user.deleted") {
    const userData = evt.data as { id: string };
    const deletedUser = await deleteUser(userData.id);
    return NextResponse.json({ message: "OK", user: deletedUser });
  }

  console.log(`Unhandled webhook: ${eventType}`, body);
  return new NextResponse(null, { status: 200 });
}
