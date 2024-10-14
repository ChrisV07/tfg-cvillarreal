'use client';

import { useEffect } from 'react';

export default function StoreCurrentUrl() {
  useEffect(() => {
    // Save the current URL to localStorage when the component mounts
    const currentUrl = window.location.href;
    if (!currentUrl.includes('/auth/')) {
      localStorage.setItem('redirectUrl', currentUrl);
    }
  }, []);

  // This component doesn't render anything
  return null;
}