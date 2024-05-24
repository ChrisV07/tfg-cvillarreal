import ToastNotification from "@/components/ui/ToastNotification";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Image from "next/legacy/image";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        
        <div className="grid grid-cols-2 bg-violet-800 h-full w-full">
      <div className="p-16 py-40">
      <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
                    {children}
                </main>
                </div>
      <div className="relative h-full w-full">
        <Image
          className="object-cover z-0"
          src="/background-image.svg"
          layout="fill"
          alt="https://www.vecteezy.com/free-photos/ai-generated"
          priority={true}

        />

      </div>
    </div>
                


        </>
    )
}