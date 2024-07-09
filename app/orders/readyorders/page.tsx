"use client"
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import { useCurrentUser } from "@/hooks/use-current-session";
import { redirect } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import ReadyOrderItem from "@/components/order/ReadyOrderItem";
import Heading from "@/components/ui/Heading";

export default function ReadyOrdersPage() {
  const user = useCurrentUser();

  if (user?.role !== 'READY_ORDERS' && user?.role !== 'RESTO_ADMIN') {
    redirect('/api/auth/signout');
    return null;
  }

  const url = '/orders/readyorders/api';
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <p>Cargando...</p>;

  if (data) {
    const orders = data.filter((order) => order.restaurantID === user.restaurantID);
    return (
      <>
        <div className="flex justify-end">
          <UserButton />
        </div>
        <h1 className="text-center mt-20 text-4xl font-black">Ordenes Listas</h1>

        <Heading>Administrar Ordenes</Heading>

        <Logo />

        {orders.length ? (
          <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
            {orders.map(order => (
              <ReadyOrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center my-10 text-xl">No Hay Ordenes Listas </p>
        )}
      </>
    );
  }

  return null;
}