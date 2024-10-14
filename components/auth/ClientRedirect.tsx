'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientRedirect({ fallbackUrl }: { fallbackUrl: string }) {
  const router = useRouter();

  useEffect(() => {
    const redirectUrl = localStorage.getItem("redirectUrl");
    if (redirectUrl) {
      router.push(redirectUrl);
    } else {
      router.push(fallbackUrl);
    }
  }, [fallbackUrl, router]);

  return null; // This component doesn't render anything
}