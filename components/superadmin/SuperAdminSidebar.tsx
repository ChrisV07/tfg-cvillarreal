import Image from "next/image";
import Logo from "../ui/Logo";
import SuperAdminRoute from "./SuperAdminRoute";
import { signOut } from "@/auth";
import { getRestaurant } from "@/actions/get-restaurant-action";

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

type SuperAdminSidebarProps = {
  restaurantID: string
}

export default async function SuperAdminSidebar({restaurantID}: SuperAdminSidebarProps) {

  const restaurantData = await getRestaurant(restaurantID)

  return (
    <>
      <div className="print:hidden ">
        <Logo imagePath={restaurantData?.image!}/>
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
              <Image src="/LogOut.svg" alt="imagen categoria" fill   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 />
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
