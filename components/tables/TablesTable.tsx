"use client";
import { useState, useEffect } from "react";
import { Table } from "@prisma/client";
import Link from "next/link";
import DeleteTableButton from "./DeleteTableButton";
import { useCurrentRestaurant } from "@/hooks/use-current-session";
import Pagination from "@/components/ui/Pagination";

type TablesTableProps = {
  tables: Table[];
  initialPage: number;
  pageSize: number;
};

export default function TablesTable({ tables, initialPage, pageSize }: TablesTableProps) {
  const restaurantID = useCurrentRestaurant();
  const [filteredTables, setFilteredTables] = useState<Table[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const filtered = tables.filter((table) => table.restaurantID === restaurantID);
    setFilteredTables(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize));
  }, [tables, restaurantID, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedTables = filteredTables.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-20">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 rounded-xl shadow">
            {paginatedTables.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Ubicación
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
                  {paginatedTables.map((table) => (
                    <tr key={table.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {table.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {table.ubication}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Link
                          href={`/admin/tables/view-qr/${table.id}`}
                          className="text-violet-800 hover:violet-red-900"
                        >
                          Ver QR <span className="sr-only">, {table.name}</span>
                        </Link>
                        <Link
                          href={`/admin/tables/edit/${table.id}`}
                          className="text-pink-600 hover:text-pink-800 px-8"
                        >
                          Editar <span className="sr-only">, {table.name}</span>
                        </Link>
                        <DeleteTableButton id={table.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                <p className="text-gray-600 text-lg mt-40 mb-2 text-center">
                  No existen Mesas.
                </p>
                <p className="text-gray-400 text-lg mb-40 text-center">
                  Crea una presionando en "Crear Mesa"
                </p>
              </>
            )}
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              path="/admin/tables"
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}