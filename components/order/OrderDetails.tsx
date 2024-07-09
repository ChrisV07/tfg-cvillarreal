import { OrderWithProducts } from "@/src/types";
import { formatCurrency, formatDate } from "@/src/utils";

type OrderDetailsProps = {
  order: OrderWithProducts;
};

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="bg-white shadow p-5 space-y-5 rounded-lg mt-12">
      <p className="text-2xl font-medium text-gray-900">Mesa: {order.table.name}</p>
      <p className="text-2xl font-medium text-gray-900">Cliente: {order.name}</p>
      <p className="text-2xl font-medium text-gray-900">Fecha: {formatDate(order.date.toString())}</p>
      <p className="text-lg font-medium text-gray-900">Productos Ordenados:</p>
      <dl className="mt-6 space-y-4">
        {order.orderProducts.map((orderProduct) => (
          <div
            key={orderProduct.product.id}
            className="flex items-center gap-2 border-t border-gray-200 pt-4"
          >
            <dt className="flex items-center text-sm text-gray-600">
              <span className="font-black">({orderProduct.quantity}) </span>
            </dt>
            <dd className="text-sm font-medium text-gray-900">{orderProduct.product.name}</dd>
            <dd className="text-sm font-medium text-gray-900">{orderProduct.product.price  * orderProduct.quantity}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">Total:</dt>
          <dd className="text-base font-medium text-gray-900">{formatCurrency(order.total)}</dd>
        </div>
      </dl>
    </div>
  );
}