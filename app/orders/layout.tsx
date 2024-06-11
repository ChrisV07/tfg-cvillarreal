import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


export const metadata: Metadata = {
  title: "Quiosco de comida",
  description: "Quiosco de comidas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
    <html lang="en">
      <body className= 'bg-gray-200'>{children}</body>
    </html>
    </SessionProvider>
  );
}
