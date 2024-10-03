import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const orders = await prisma.dailyOrder.findMany({
    take: 10,
    where: {
      isClosed: false,
      isBillRequested: true,
    },
    orderBy: {
      date: "desc",
    },
    include: {
      table: true,
      orders: {
        include: {
          orderProducts: {
            include: {
              product: true,
            },
          },
          table: true,
        },
      },
    },
  });

  return Response.json(orders);
}
