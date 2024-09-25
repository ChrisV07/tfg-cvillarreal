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
    image: "/OrdersKitchen.svg",
  },
  {
    url: "/orders/readyorders",
    text: "Ordenes Listas",
    blank: true,
    image: "/OrdersReady.svg",
  },
  {
    url: "/admin/orders_history",
    text: "Historial de Ordenes",
    blank: true,
    image: "/OrdersHistory.svg",
  },
  { 
    url: "/menu/cafe", 
    text: "Feedback", 
    blank: false, 
    image: "/Feedback.svg" },
  { 
    url: "/menu/cafe", 
    text: "Ver Menú", 
    blank: true, 
    image: "/Menu.svg" },
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
        </div>
      </div>
    </>
  );
}
