"use client";

import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import Logo from "@/components/ui/Logo";
import { useCurrentUser } from "@/hooks/use-current-session";
import { OrderWithProducts } from "@/src/types";
import { redirect } from "next/navigation";
import React from "react";
import useSWR from "swr";

export default function OrderPages() {
  const user = useCurrentUser()
  if (user?.role == 'KITCHEN_ORDERS' || user?.role == 'RESTO_ADMIN') {
  const url = "/orders/kitchenorders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <p>Cargando...</p>;

  if (data) {
    const orders = data.filter((order) => order.restaurantID === user.restaurantID)
  
    return (
      <>
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
          <Logo/>
          <p className="text-center mt-10">No Hay Ordenes Pendientes</p>
          </>
        )}
      </>
    );}
    redirect('/api/auth/signout')
}
}
