import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: "shadow-lg rounded-lg bg-white p-6 w-full max-w-md",
        },
      }}
    />
  );
}
