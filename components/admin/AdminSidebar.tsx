import Image from "next/image";
import Logo from "../ui/Logo";
import AdminRoute from "./AdminRoute";
import { auth, signOut } from "@/auth";

const adminNavigation = [
    
  {
    url: "/admin/products",
    text: "Productos",
    blank: false,
    image: "/Productos.svg",
  },
  {
    url: "/admin/tables",
    text: "Administrar Mesas",
    blank: false,
    image: "/Mesas.svg",
  },
  {
    url: "/orders/kitchenorders",
    text: "Ordenes Cocina",
    blank: true,
    image: "/Orders.svg",
  },
  {
    url: "/orders/readyorders",
    text: "Ordenes Listas",
    blank: true,
    image: "/Orders.svg",
  },
  { url: "/menu/cafe", text: "Ver Menú", blank: true, image: "/Menu.svg" },
];

export default async function AdminSidebar() {
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
              <AdminRoute key={link.url} link={link} />
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
