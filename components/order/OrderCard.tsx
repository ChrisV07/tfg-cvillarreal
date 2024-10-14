import { completeKitchenOrder } from "@/actions/complete-order-action";
import { OrderWithProducts } from "@/src/types";
import { useTransition } from "react";


type OrderCardProps = {
  order: OrderWithProducts;
};

export default function OrderCard({ order }: OrderCardProps) {
  const [isPending, startTransition] = useTransition();


  return (
    <div className="bg-white shadow rounded-lg flex flex-col h-full">
      <div>
        <div className="p-5 space-y-4">
          <p className="text-2xl text-center font-bold text-pink-600">
            Comanda
          </p>
          <p className="text-2xl text-center font-bold text-slate-600">
            {order.table.name}
          </p>
          <p className="text-2xl font-bold text-slate-600 capitalize">
            Cliente: {order.name}
          </p>
          <p className="text-2xl font-bold text-slate-600 capitalize">
            Productos Ordenados:
          </p>

        <ul
          className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
          role="list"
        >
          {order.orderProducts.map((product) => (
            <li key={product.id} className="flex py-4 text-lg">
              <p>
                <span className="font-bold">({product.quantity}) </span>
                {product.product.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto p-5 pt-0">
        <form action={completeKitchenOrder}>
          <input type="hidden" value={order.id} name="order_id" />
          <input
            type="submit"
            className="bg-pink-600 hover:bg-pink-800 text-white w-full p-3 uppercase font-bold cursor-pointer rounded-xl"
            value="Marcar Orden como Listo"
          />
        </form>
      </div>
    </div>
    </div>
  );
}
