import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSumary from "@/components/order/OrderSumary";
import ToastNotification from "@/components/ui/ToastNotification";
import FloatingCartButton from "@/components/ui/FloatingCartButton";
import { SessionProvider } from "next-auth/react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <>
        <div className="md:flex">
          <OrderSidebar />
          <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
            {children}
          </main>
          <OrderSumary />
        </div>
        <FloatingCartButton />
        <ToastNotification />
      </>
    </SessionProvider>
  );
}