"use client";

import ToastNotification from "@/components/ui/ToastNotification";
import ContextProvider from "@/src/context/context";
import { useParams } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Obtén el restaurantId desde la URL usando useParams
  const { restaurant } = useParams(); // 'restaurant' es el nombre del parámetro de la URL
  
  return (
    <ContextProvider restaurantId={restaurant}> {/* Pasar restaurantId como prop */}
      <>
        <div className="md:flex">
          <main className="md:flex-1 md:h-screen md:overflow-y-scroll">
            {children}
          </main>
        </div>
        <ToastNotification />
      </>
    </ContextProvider>
  );
}
