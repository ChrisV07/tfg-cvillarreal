import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSumary from "@/components/order/OrderSumary";
import ToastNotification from "@/components/ui/ToastNotification";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { restaurant: string };
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
        <ToastNotification />
      </>
    </SessionProvider>
  );
}