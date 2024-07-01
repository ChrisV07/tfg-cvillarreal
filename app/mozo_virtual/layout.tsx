"use client"
import ToastNotification from "@/components/ui/ToastNotification";
import ContextProvider from "@/src/context/context";


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ContextProvider>
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
