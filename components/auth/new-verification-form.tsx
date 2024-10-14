"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../ui/FormSuccess";
import { FormError } from "../ui/form-error";

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Token Faltante!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success), setError(data.error);
      })
      .catch(() => {
        setError("Algo salio mal!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Suspense>
    <>
    <CardWrapper
      headerTitle="📧 Verificación"
      headerLabel="Verificando tu correo electronico"
      backButtonLabel="Ir a iniciar Sesión"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}

        <FormSuccess message={success} />
        {!success && (
          <FormError message={error} />
        )}
      </div>
    </CardWrapper>
    </>
    </Suspense>
  );
}
