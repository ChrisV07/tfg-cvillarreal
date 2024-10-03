"use client"
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import {OrderWithProducts, DailyOrderWithProducts } from "@/src/types";
import { useCurrentUser } from "@/hooks/use-current-session";
import { redirect } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import ReadyOrderItem from "@/components/order/ReadyOrderItem";
import Heading from "@/components/ui/Heading";
import RequestedBillOrder from "@/components/order/RequestedBillOrder";



const fetcher = (url: string) => fetch(url).then(res => res.json()).then(data => data);


export default function ReadyOrdersPage() {
  const user = useCurrentUser();

  if (user?.role !== 'READY_ORDERS' && user?.role !== 'RESTO_ADMIN') {
    redirect('/api/auth/signout');
    return null;
  }

  const urlReadyOrders = '/api/ready-orders';
  const { data: readyOrders, error: errorReadyOrders, isLoading: isLoadingReadyOrders } = useSWR<OrderWithProducts[]>(urlReadyOrders, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
  });

  const urlRequestedBillOrders = '/api/requested-bill-orders';
  const { data: requestedBillOrders, error: errorRequestedBillOrders, isLoading: isLoadingRequestedBillOrders } = useSWR<DailyOrderWithProducts[]>(urlRequestedBillOrders, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
  });

  if (isLoadingReadyOrders || isLoadingRequestedBillOrders) return <p>Cargando...</p>;
  if (errorReadyOrders || errorRequestedBillOrders) return <p>Error al cargar datos</p>;

  const filteredReadyOrders = readyOrders?.filter(order => order.restaurantID === user.restaurantID) || [];
  const filteredRequestedBillOrders = requestedBillOrders?.filter(order => order.restaurantID === user.restaurantID) || [];

  
    return (
      <>
        <div className="flex justify-end">
          <UserButton />
        </div>
        <h1 className="text-center mt-20 text-4xl font-black">Ordenes Listas</h1>

        <Heading>Administrar Ordenes</Heading>

        <Logo />

        {filteredReadyOrders.length || filteredRequestedBillOrders ? (
          <><div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
            {filteredReadyOrders.map(readyOrder => (
              <ReadyOrderItem key={readyOrder.id} order={readyOrder} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
          {filteredRequestedBillOrders.map(requestedBillOrder => (
<RequestedBillOrder key={requestedBillOrder.id} dailyOrder={requestedBillOrder} />          ))}
        </div>
        </>
        ) : (
          <p className="text-center my-10 text-xl">No Hay Ordenes </p>
        )}
        
      </>
    );
  }


