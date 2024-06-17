"use client";
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { useEffect, useMemo } from "react";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schemas";
import { toast } from "react-toastify";
import { UserButton } from "../auth/user-button";
import ScrollToBottom from "@/components/order/ScrollToBottom"

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const tableId = useStore((state) => state.tableId);
  const setTableId = useStore((state) => state.setTableId);
  const clearOrder = useStore((state) => state.clearOrder);
  const total = useMemo(
    () => order.reduce((total, item) => total + item.price * item.quantity, 0),
    [order]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramTableId = urlParams.get("table");
    if (paramTableId) {
      setTableId(paramTableId);
    }
  }, [setTableId]);

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order,
      tableId: tableId,
    };

    const result = OrderSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message, { theme: "dark" });
      });
      return;
    }

    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message, { theme: "dark" });
      });
    }
    toast.success("Pedido Realizado Correctamente", { theme: "dark" });
    clearOrder();
  };

  return (
    <aside className="w-full md:w-64 lg:w-96 h-auto lg:h-screen lg:overflow-y-scroll p-5 bg-white">
      <UserButton />
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10"> El pedido está vacio</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}

          <p className="text-2xl mt-20 text-center">
            Total a Pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form className="w-full mt-10 space-y-5" action={handleCreateOrder}>
            <input
              type="text"
              placeholder="Ingresa Tu Nombre"
              className="bg-white border border-gray-200 p-2 w-full rounded-xl"
              name="name"
            />

            <input
              type="submit"
              className="py-2 rounded-xl uppercase text-white bg-black w-full text-center cursor-pointer"
              value="Confirmar Pedido"
            />
          </form>
        </div>
        
      )}
       <div className="sm:hidden mt-5">
          <ScrollToBottom itemCount={order.length} />
        
        </div>
    </aside>
    
  );
}