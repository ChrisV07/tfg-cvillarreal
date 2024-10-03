// src/store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

type Store = {
  order: OrderItem[];
  tableId: string;
  dailyOrderTotal: number; // Agregar propiedad para el total diario
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  removeItem: (id: Product["id"]) => void;
  clearOrder: () => void;
  setTableId: (tableId: string) => void;
  setDailyOrderTotal: (total: number) => void; // Método para actualizar el total diario
};

export const useStore = create(
  persist<Store>(
    (set, get) => ({
      order: [],
      tableId: "",
      dailyOrderTotal: 0, // Inicializar el total diario
      addToOrder: (product) => {
        const { categoryId, image, ...data } = product;
        let order: OrderItem[] = [];

        if (get().order.find((item) => item.id === data.id)) {
          order = get().order.map((item) =>
            item.id === data.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  subtotal: item.price * (item.quantity + 1),
                }
              : item
          );
        } else {
          order = [
            ...get().order,
            {
              ...data,
              quantity: 1,
              subtotal: 1 * product.price,
            },
          ];
        }
        set({ order });
      },
      increaseQuantity: (id) => {
        set((state) => ({
          order: state.order.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  subtotal: item.price * (item.quantity + 1),
                }
              : item
          ),
        }));
      },
      decreaseQuantity: (id) => {
        const order = get().order.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: item.price * (item.quantity - 1),
              }
            : item
        );

        set({ order });
      },
      removeItem: (id) => {
        set((state) => ({
          order: state.order.filter((item) => item.id !== id),
        }));
      },
      clearOrder: () => {
        set({ order: [] });
      },
      setTableId: (tableId) => set({ tableId }),
      setDailyOrderTotal: (total) => set({ dailyOrderTotal: total }), // Implementación de la función
    }),
    {
      name: "order-storage", // Nombre de la clave en el localStorage
    }
  )
);
