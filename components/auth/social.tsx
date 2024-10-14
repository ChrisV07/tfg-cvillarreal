"use client";

import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export const Social = () => {
  const onClick = (provider: "google") => {
    // Almacena la URL actual en localStorage
    const currentUrl = window.location.href;
    localStorage.getItem("redirectUrl");
    
    // Redirige al inicio de sesión con la URL almacenada como callbackUrl
    signIn(provider, {
      callbackUrl: currentUrl, // Usa la URL actual como callback
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
};
