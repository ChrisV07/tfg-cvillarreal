
import { payBill } from "@/actions/pay-bill-action";
import { DailyOrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { useState } from "react";

type RequestedBillOrderProps = {
  dailyOrder: DailyOrderWithProducts;
};

export default function RequestedBillOrder({
  dailyOrder,
}: RequestedBillOrderProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const clientName = dailyOrder.orders[0]?.name || "Unknown";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    const formData = new FormData(event.currentTarget); // Obtiene los datos del formulario
    const result = await payBill(formData); // Llama a la función payBill

    if (result.success) {
      // Maneja el éxito (puedes redirigir, mostrar un mensaje, etc.)
      console.log("Pago exitoso:", result.dailyOrder);
      // Puedes agregar lógica para redirigir o actualizar el estado
    } else {
      // Maneja el error
      setErrorMessage(result.error!);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg flex flex-col h-full">
      <div className="p-5 space-y-4">
        <p className="text-2xl text-center font-bold text-emerald-600">
          Cuenta Solicitada
        </p>
        <p className="text-2xl text-center font-bold text-slate-600">
          {dailyOrder.table.name}
        </p>
        <p className="text-2xl font-bold text-slate-600 capitalize">
          Cliente: {clientName}
        </p>

        {dailyOrder.orders.map((order, index) => (
          <div
            key={order.id}
            className="border-t pt-4 first:border-t-0 first:pt-0"
          >
            <p className="text-xl font-semibold text-slate-600 mb-2">
              Orden #{index + 1}
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
            Método de Pago:{" "}
            <span className="capitalize">{dailyOrder.paymentMethod}</span>
          </p>
          {dailyOrder.paymentMethod === "efectivo" && (
            <p className="text-2xl font-bold text-slate-600 capitalize text-left mt-4">
              Paga con:{" "}
              <span className="capitalize">
                {formatCurrency(dailyOrder.payWith!)}
              </span>
            </p>
          )}
        </div>

        {errorMessage && (
          <p className="text-red-600 text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input type="hidden" value={dailyOrder.id} name="dailyOrderId" />
          <input
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-800 text-white w-full p-3 uppercase font-bold cursor-pointer rounded-xl"
            value="Marcar Orden como Pagada"
          />
        </form>
      </div>
    </div>
  );
}
