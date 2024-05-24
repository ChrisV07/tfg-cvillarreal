import RegisterForm from "@/components/auth/register-form";
import React from "react";

export default function RegisterPage() {
  return (
    <div className="grid grid-cols-2 bg-violet-800 h-full w-full">
      <div className="p-16 py-40">
        <RegisterForm />
      </div>
    </div>
  );
}
