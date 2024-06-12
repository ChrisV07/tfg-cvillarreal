"use client"
import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSumary from "@/components/order/OrderSumary";
import ToastNotification from "@/components/ui/ToastNotification";
import ContextProvider from "@/src/context/context";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ContextProvider>
      <>
        <div className="md:flex">
          <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
            {children}
          </main>
        </div>
        <ToastNotification />
      </>
    </ContextProvider>
  );
}
