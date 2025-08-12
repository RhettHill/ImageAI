// app/api/webhooks/clerk/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, updateUser, deleteUser } from "@/lib/actions/user.actions";

declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return new NextResponse("Missing WEBHOOK_SECRET", { status: 500 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  // ✅ Get the raw body string (required for signature verification)
  const body = await req.text();

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("❌ Error verifying webhook:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // Handle events
  switch (evt.type) {
    case "user.created": {
      const data = evt.data;
      const params: CreateUserParams = {
        clerkId: data.id,
        email: data.email_addresses[0]?.email_address ?? "",
        username: data.username ?? `user_${data.id}`,
        firstName: data.first_name ?? "",
        lastName: data.last_name ?? "",
        photo: data.image_url ?? "",
      };
      await createUser(params);
      break;
    }

    case "user.updated": {
      const data = evt.data;
      await updateUser(data.id, {
        username: data.username ?? "",
        firstName: data.first_name ?? "",
        lastName: data.last_name ?? "",
        photo: data.image_url ?? "",
      });
      break;
    }

    case "user.deleted": {
      const data = evt.data as { id: string };
      await deleteUser(data.id);
      break;
    }

    default:
      console.log(`ℹ️ Unhandled event type: ${evt.type}`);
  }

  return new NextResponse("OK", { status: 200 });
}
