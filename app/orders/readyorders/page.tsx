"use client";

import { useEffect } from 'react';
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts, DailyOrderWithProducts } from "@/src/types";
import { useCurrentUser } from "@/hooks/use-current-session";
import { useRouter } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import ReadyOrderItem from "@/components/order/ReadyOrderItem";
import Heading from "@/components/ui/Heading";
import RequestedBillOrder from "@/components/order/RequestedBillOrder";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ReadyOrdersPage() {
  const user = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'READY_ORDERS' && user.role !== 'RESTO_ADMIN') {
      router.push('/api/auth/signout');
    }
  }, [user, router]);

  const { data: readyOrders, error: errorReadyOrders, isLoading: isLoadingReadyOrders } = useSWR<OrderWithProducts[]>('/api/ready-orders', fetcher, {
    refreshInterval: 500,
    revalidateOnFocus: false,
  });

  const { data: requestedBillOrders, error: errorRequestedBillOrders, isLoading: isLoadingRequestedBillOrders } = useSWR<DailyOrderWithProducts[]>('/api/requested-bill-orders', fetcher, {
    refreshInterval: 500,
    revalidateOnFocus: false,
  });

  if (!user) return null;

  if (isLoadingReadyOrders || isLoadingRequestedBillOrders) return <p>Cargando...</p>;
  if (errorReadyOrders || errorRequestedBillOrders) return <p>Error al cargar datos</p>;

  const filteredReadyOrders = readyOrders?.filter(order => order.restaurantID === user.restaurantID) || [];
  const filteredRequestedBillOrders = requestedBillOrders?.filter(order => order.restaurantID === user.restaurantID) || [];

  const hasOrders = filteredReadyOrders.length > 0 || filteredRequestedBillOrders.length > 0;

  return (
    <>
      <div className="flex justify-end">
        <UserButton />
      </div>
      <h1 className="text-center mt-10 text-4xl font-black">Órdenes Listas</h1>

      <Heading>Administrar Órdenes</Heading>

      {!hasOrders && <Logo />} {/* Mostrar logo solo si no hay órdenes */}

      {hasOrders ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {filteredReadyOrders.map(readyOrder => (
              <ReadyOrderItem key={readyOrder.id} order={readyOrder} />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {filteredRequestedBillOrders.map(requestedBillOrder => (
              <RequestedBillOrder key={requestedBillOrder.id} dailyOrder={requestedBillOrder} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center my-10 text-xl">No hay órdenes pendientes</p>
      )}
    </>
  );
}
