import LoginForm from "@/components/auth/login-form";
import React from "react";

export default function page() {
  return (
    <div className="grid grid-cols-2 bg-violet-800 h-full w-full">
      <div className="p-16 py-40">
        <LoginForm />
      </div>
    </div>
  );
}
