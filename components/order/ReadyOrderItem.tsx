import { deliverOrder } from "@/actions/deliver-order-action";
import { OrderWithProducts } from "@/src/types";

type ReadyOrderItemProps = {
  order: OrderWithProducts;
};

export default function ReadyOrderItem({ order }: ReadyOrderItemProps) {
  return (
    <div className="bg-white shadow rounded-lg flex flex-col h-full">
      <div className="p-5 space-y-4">
        <p className="text-2xl text-center font-bold text-pink-600">
          Pedido Cocinado
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
        <form action={deliverOrder}>
          <input type="hidden" value={order.id} name="order_id" />
          <input
            type="submit"
            className="bg-pink-600 hover:bg-pink-800 text-white w-full p-3 uppercase font-bold cursor-pointer rounded-xl"
            value="Marcar Orden como Entregada"
          />
        </form>
      </div>
    </div>
  );
}
