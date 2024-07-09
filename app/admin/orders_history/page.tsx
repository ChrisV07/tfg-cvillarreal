import ProductSearchForm from "@/components/products/ProductSearchForm";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import OrdersTable from "@/components/order/OrdersTable";
import { UserButton } from "@/components/auth/user-button";

async function ordersCount() {
  return await prisma.order.count();
}

async function getOrders() {
  const orders = await prisma.order.findMany({
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
      table: true, 
    },
  });
  return orders;
}


export default async function OrdersHistoryPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;

  const ordersData = getOrders();
  const totalOrdersData = ordersCount();

  const [orders] = await Promise.all([
    ordersData,
    totalOrdersData,
  ]);


  return (
    <>
      <div className="flex justify-end">
        <UserButton />
      </div>
      <div className="text-center">
        <Heading>Historial de Ordenes</Heading>
      </div>


      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
 

      </div>

      <OrdersTable orders={orders} initialPage={page} pageSize={pageSize} />
    </>
  );
}