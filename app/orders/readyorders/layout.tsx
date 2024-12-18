import ToastNotification from "@/components/ui/ToastNotification";
import { auth} from "@/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";



export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()

    if (session?.user.role !== 'READY_ORDERS' && session?.user.role !== 'RESTO_ADMIN') {
        redirect('/')
    }
    
   
    return (
        <>
        <SessionProvider session={session}>
            <div className="md:flex">

                <main className="md:flex-1 md:h-screen md:overflow-y-scroll bg-gray-200 p-5">
                    {children}
                </main>
            </div>
            <ToastNotification />
            </SessionProvider>
        </>
    )
}