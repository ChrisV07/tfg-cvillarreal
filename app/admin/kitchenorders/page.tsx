"use client";

import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import React from "react";
import useSWR from "swr";

export default function OrderPages() {
  const url = "/admin/kitchenorders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <p>Cargando...</p>;

  if (data)
    return (
      <>
        <h1 className="text-4xl text-center font-black mt-10">Cocina</h1>


          <Heading>Administrar Ordenes</Heading>


        {data.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {data.map((order) => (
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
    );
}
