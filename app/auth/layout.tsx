
import Image from "next/legacy/image";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
          <div className="grid grid-cols-1 md:grid-cols-2 bg-violet-800 h-screen w-full">
              {/* Lado izquierdo - formulario */}
              <div className="flex justify-center items-center p-8 md:p-16">
                  <main className="w-full max-w-md">
                      {children}
                  </main>
              </div>

              {/* Lado derecho - imagen */}
              <div className="relative hidden md:block h-full w-full">
                  <Image
                      className="object-cover z-0"
                      src="/background-image.svg"
                      layout="fill"
                      alt="https://www.vecteezy.com/free-photos/ai-generated"
                      priority={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
              </div>
          </div>
      </>
  );
}
