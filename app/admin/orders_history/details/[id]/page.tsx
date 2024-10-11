import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"
import { DailyOrderWithProducts } from "@/src/types"
import { formatCurrency, formatDate } from "@/src/utils"

async function getDailyOrderById(id: string): Promise<DailyOrderWithProducts> {
  const dailyOrder = await prisma.dailyOrder.findUnique({
    where: { id },
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

  if (!dailyOrder) {
    notFound()
  }

  return dailyOrder
}

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const dailyOrder = await getDailyOrderById(params.id)
  const firstOrderName = dailyOrder.orders[0]?.name || 'Sin nombre'

  return (
    <div className="container mx-auto px-4 py-8">
      <Heading>Detalle de la Orden Diaria: {dailyOrder.id}</Heading>
      <GoBackButton seccion="Órdenes" />
      
      <div className="bg-white shadow rounded-lg flex flex-col h-full mt-8">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-pink-600">
                Mesa: {dailyOrder.table.name}
              </p>
              <p className="text-xl font-semibold text-slate-600 mt-2">
                Cliente: {firstOrderName}
              </p>
              <p className="text-xl font-semibold text-slate-600 capitalize  mt-2">
              Método de Pago: <span className="capitalize">{dailyOrder.paymentMethod || 'No especificado'}</span>
            </p>
        
            </div>
            <p className="text-xl font-semibold text-slate-600">
              Fecha: {formatDate(dailyOrder.date.toString())}
            </p>
          </div>

          {dailyOrder.orders.map((order, index) => (
            <div key={order.id} className="border-t pt-6 first:border-t-0 first:pt-0">
              <p className="text-xl font-semibold text-slate-600 mb-4">
                Orden #{index + 1} :
              </p>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unitario</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.orderProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product.product.price)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product.product.price * product.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-right text-lg font-semibold text-slate-600 mt-4">
                Subtotal de la Orden: {formatCurrency(order.total)}
              </p>
            </div>
          ))}

          <div className="border-t pt-6">
            <p className="text-2xl font-bold text-slate-600 text-right">
              Total de la Orden Diaria: {formatCurrency(dailyOrder.total)}
            </p>
           
            {dailyOrder.paymentMethod === "efectivo" && dailyOrder.payWith && (
              <p className="text-xl font-semibold text-slate-600 capitalize text-right mt-2">
                Paga con: <span className="capitalize">{formatCurrency(dailyOrder.payWith)}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}