"use client";
import { useState, useEffect } from "react";
import { formatCurrency, formatDate } from "@/src/utils";
import Link from "next/link";
import { useCurrentRestaurant } from "@/hooks/use-current-session";
import Pagination from "@/components/ui/Pagination";
import { OrderWithProducts } from "@/src/types";
import DeleteProductButton from "../products/DeleteProductButton";

type OrdersTableProps = {
  orders: OrderWithProducts[];
  initialPage?: number;
  pageSize?: number;
};

export default function OrdersTable({ orders, initialPage = 1, pageSize = 10 }: OrdersTableProps) {
  const restaurantID = useCurrentRestaurant();
  const [filteredOrders, setFilteredOrders] = useState<OrderWithProducts[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const filtered = orders.filter((order) => order.restaurantID === restaurantID);
    setFilteredOrders(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize));
  }, [orders, restaurantID, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-12">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 rounded-xl shadow">
            {paginatedOrders.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                  <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Orden
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Cliente
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Mesa
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                    >
                      Acciones
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {order.id}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {order.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {order.table.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatDate(order.date.toString())}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Link
                          href={`/admin/orders_history/details/${order.id}`}
                          className="text-violet-800 hover:text-violet-400 px-8"
                        >
                          Ver Detalles <span className="sr-only">, {order.name}</span>
                        </Link>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                <p className="text-gray-600 text-lg mt-40 mb-2 text-center">
                  No existen órdenes.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-200">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          path="/admin/orders_history"
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}