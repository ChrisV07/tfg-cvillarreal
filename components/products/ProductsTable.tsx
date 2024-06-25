"use client"

import { useState, useEffect } from "react";
import { ProductsWithCategory } from "@/app/admin/products/page";
import { formatCurrency } from "@/src/utils";
import Link from "next/link";
import DeleteProductButton from "./DeleteProductButton";
import { useCurrentRestaurant } from "@/hooks/use-current-session";
import Pagination from "@/components/ui/Pagination";

type ProductTableProps = {
  products: ProductsWithCategory;
  initialPage: number;
  pageSize: number;
};

export default function ProductTable({ products, initialPage, pageSize }: ProductTableProps) {
  const restaurantID = useCurrentRestaurant();
  const [filteredProducts, setFilteredProducts] = useState<ProductsWithCategory>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const filtered = products.filter((product) => product.restaurantID === restaurantID);
    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize));
  }, [products, restaurantID, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-20">
      <div className="mt-8 flow-root ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 rounded-xl shadow">
            {paginatedProducts.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-300 ">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Producto
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Precio
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Categoría
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {product.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.category.name}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="text-violet-800 hover:text-violet-400 px-8"
                        >
                          Editar <span className="sr-only">, {product.name}</span>
                        </Link>
                        <DeleteProductButton id={product.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                <p className="text-gray-600 text-lg mt-40 mb-2 text-center">
                  No existen productos.
                </p>
                <p className="text-gray-400 text-lg mb-40 text-center">
                  Crea uno presionando en "Crear Producto"
                </p>
              </>
            )}
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              path="/admin/products"
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}