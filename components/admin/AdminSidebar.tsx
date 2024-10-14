"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import AdminRoute from "@/components/admin/AdminRoute";
import { useCurrentUser } from "@/hooks/use-current-session";
import { getRestaurant } from "@/actions/get-restaurant-action"; // Importa la función para obtener el restaurante
import { Restaurant } from "@prisma/client";
import { getImagePath, getRestaurantImagePath } from "@/src/utils"; // Asegúrate de que esta función esté importada




export default function AdminSidebar() {
  const user = useCurrentUser();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

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
      url: "/admin/feedback_history",
      text: "Feedback",
      blank: false,
      image: "/Feedback.svg",
    },
    {
      url: `/menu/${user?.restaurantID}/cafe`, // Modificado aquí
      text: "Ver Menú",
      blank: true,
      image: "/Menu.svg",
    },
  ];

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!user?.restaurantID) {
        return;
      }

      try {
        const fetchedRestaurant = await getRestaurant(user.restaurantID);
        setRestaurant(fetchedRestaurant);
      } catch (err) {
      }
    };

    fetchRestaurant();
  }, [user?.restaurantID]); // Dependencia en restaurantID

  // Manejar el caso en que restaurant es null
  const imagePath = restaurant ? getImagePath(restaurant.image!) : '';

  return (
    <>
      <div className="print:hidden">
      <>
      {imagePath ? (
                <Logo imagePath={getRestaurantImagePath(imagePath)!} />

      ) : (
        <p>Cargando imagen...</p> 
      )}
    </>
        <div className="space-y-2">
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
