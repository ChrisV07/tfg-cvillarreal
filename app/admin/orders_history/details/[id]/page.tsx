import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import OrderDetail from "@/components/order/OrderDetails";
import { OrderWithProducts } from "@/src/types";

async function getOrderById(id: number): Promise<OrderWithProducts> {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
      table: true,
    },
  });

  if (!order) {
    notFound();
  }

  return order;
}

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = await getOrderById(+params.id);

  return (
    <>
      <Heading>Detalle de la Orden: {order.id}</Heading>
      <GoBackButton seccion="Órdenes" />
      <OrderDetail order={order} />
    </>
  );
}
