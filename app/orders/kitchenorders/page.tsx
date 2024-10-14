"use client";

import { getRestaurant } from "@/actions/get-restaurant-action";
import { UserButton } from "@/components/auth/user-button";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import Logo from "@/components/ui/Logo";
import { useCurrentUser } from "@/hooks/use-current-session";
import { OrderWithProducts } from "@/src/types";
import { getImagePath, getRestaurantImagePath } from "@/src/utils";
import { Restaurant } from "@prisma/client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

export default function OrderPages() {
  const user = useCurrentUser();

  // Verifica si el usuario tiene un rol válido
  if (!user || (user.role !== "KITCHEN_ORDERS" && user.role !== "RESTO_ADMIN")) {
    redirect("/api/auth/signout");
    return null; // Asegúrate de que el componente no renderice nada
  }

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const ordersUrl = "/api/kitchen-orders";

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!user?.restaurantID) {
        console.log("No hay restaurantID definido");
        return;
      }

      try {
        const fetchedRestaurant = await getRestaurant(user.restaurantID);
        console.log("Restaurante obtenido:", fetchedRestaurant);
        setRestaurant(fetchedRestaurant);
      } catch (err) {
        console.log("Error al obtener el restaurante:", err);
      }
    };

    fetchRestaurant();
  }, [user.restaurantID]);


  // Manejar el caso en que restaurant es null
  const imagePath = restaurant ? getImagePath(restaurant.image!) : '';

  const {
    data: ordersData,
    error: ordersError,
    isLoading: ordersLoading,
  } = useSWR<OrderWithProducts[]>(ordersUrl, fetcher, {
    refreshInterval: 500,
    revalidateOnFocus: false,
  });

  if (ordersLoading) return <p>Cargando...</p>;
  if (ordersError) return <p>Error al cargar los datos</p>;

  if (ordersData) {
    const orders = ordersData.filter(
      (order) => order.restaurantID === user.restaurantID
    );

    return (
      <>
        <div className="flex justify-end">
          <UserButton />
        </div>
        <h1 className="text-4xl text-center font-black mt-10">Cocina</h1>
        <Heading>Administrar Ordenes</Heading>

        {orders.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <>
            <Logo imagePath={getRestaurantImagePath(imagePath)!} />
            <p className="text-center mt-10">No Hay Ordenes Pendientes</p>
          </>
        )}
      </>
    );
  }

  return null; // En caso de que no haya datos y no se esté cargando
}
