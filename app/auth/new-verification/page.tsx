import NewVerificationForm from "@/components/auth/new-verification-form";
import React, { Suspense } from "react";

export default function NewVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewVerificationForm />
    </Suspense>
  );
}
