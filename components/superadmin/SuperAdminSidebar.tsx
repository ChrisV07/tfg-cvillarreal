import Image from "next/image";
import Logo from "../ui/Logo";
import SuperAdminRoute from "./SuperAdminRoute";
import { auth, signOut } from "@/auth";

const adminNavigation = [
    
  {
    url: "/superadmin/restaurants",
    text: "Restaurantes",
    blank: false,
    image: "/Restaurantes.svg",
  },
  {
    url: "/superadmin/users",
    text: "Usuarios",
    blank: false,
    image: "/Users.svg",
  },
  
];

export default async function SuperAdminSidebar() {
  return (
    <>
      <div className="print:hidden ">
        <Logo />
        <div className="space-y-2 ">
          <p className="mt-8 uppercase font-bold text-sm text-gray-600 text-center">
            Navegación
          </p>
          <nav className="flex flex-col">
            {adminNavigation.map((link) => (
              <SuperAdminRoute key={link.url} link={link} />
            ))}
          </nav>
          <div className="flex items-center gap-4 w-full p-3 pt-2">
            <div className="w-16 h-16 relative">
              <Image src="/LogOut.svg" alt="imagen categoria" fill />
            </div>
            <div>
              <form
                action={async () => {
                  "use server";
                  await signOut({redirectTo:'/auth/login'})
                }}
              >
                <button className="text-xl font-bold" type="submit">
                  Cerrar Sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
