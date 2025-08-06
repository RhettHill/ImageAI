import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <SignUp
      appearance={{
        elements: {
          rootBox: "shadow-lg rounded-lg bg-white p-6 w-full max-w-md",
        },
      }}
    />
  );
};

export default SignUpPage;
