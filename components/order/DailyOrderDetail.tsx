import { DailyOrderWithProducts } from "@/src/types"
import { formatCurrency } from "@/src/utils"

type DailyOrderDetailProps = {
  dailyOrder: DailyOrderWithProducts
}

export default function DailyOrderDetail({ dailyOrder }: DailyOrderDetailProps) {
  return (
    <div className="bg-white shadow rounded-lg flex flex-col h-full">
      <div className="p-5 space-y-4">
        <p className="text-2xl text-center font-bold text-emerald-600">
          Orden Diaria
        </p>
        <p className="text-2xl text-center font-bold text-slate-600">
          {dailyOrder.table.name}
        </p>

        {dailyOrder.orders.map((order, index) => (
          <div
            key={order.id}
            className="border-t pt-4 first:border-t-0 first:pt-0"
          >
            <p className="text-xl font-semibold text-slate-600 mb-2">
              Orden #{index + 1}
            </p>
            <p className="text-lg font-medium text-slate-600 mb-2">
              Cliente: {order.name}
            </p>
            <ul className="divide-y divide-gray-200 text-sm font-medium text-gray-500">
              {order.orderProducts.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between py-2 text-lg"
                >
                  <p>
                    <span className="font-bold">({product.quantity}) </span>
                    {product.product.name}
                  </p>
                  <p>
                    {formatCurrency(product.product.price * product.quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <p className="text-right text-lg font-semibold text-slate-600 mt-2">
              Subtotal: {formatCurrency(order.total)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-auto p-5 pt-0 space-y-4">
        <div className="border-t pt-4">
          <p className="text-2xl font-bold text-slate-600 text-left mt-4">
            Total: {formatCurrency(dailyOrder.total)}
          </p>
          <p className="text-2xl font-bold text-slate-600 capitalize text-left mt-4">
            Método de Pago: <span className="capitalize">{dailyOrder.paymentMethod}</span>
          </p>
          {dailyOrder.paymentMethod === "efectivo" && dailyOrder.payWith && (
            <p className="text-2xl font-bold text-slate-600 capitalize text-left mt-4">
              Paga con: <span className="capitalize">{formatCurrency(dailyOrder.payWith)}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}