import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import OrdersTable from "@/components/order/OrdersTable"
import { UserButton } from "@/components/auth/user-button"
import { DailyOrderWithProducts } from "@/src/types"
import { Suspense } from "react"

async function dailyOrdersCount() {
  return await prisma.dailyOrder.count()
}

async function getDailyOrders(): Promise<DailyOrderWithProducts[]> {
  const dailyOrders = await prisma.dailyOrder.findMany({
    orderBy: {
      date: "desc"
    },
    include: {
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
      table: true,
    },
  })
  return dailyOrders
}

export default async function OrdersHistoryPage({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const page = +searchParams.page || 1
  const pageSize = 10

  const dailyOrdersData = getDailyOrders()
  const totalDailyOrdersData = dailyOrdersCount()

  const [dailyOrders, totalDailyOrders] = await Promise.all([
    dailyOrdersData,
    totalDailyOrdersData,
  ])

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <>
      <div className="flex justify-end">
        <UserButton />
      </div>
      <div className="text-center">
        <Heading>Historial de Ordenes Diarias</Heading>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        {/* Add any additional components or filters here if needed */}
      </div>

      <OrdersTable dailyOrders={dailyOrders} initialPage={page} pageSize={pageSize} totalDailyOrders={totalDailyOrders} />
      </>
      </Suspense>
  )
}