import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import React, { Suspense } from "react";

async function searchProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const products = await searchProducts(searchParams.search);

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <>
      <Heading>Resultados de Búsqueda: {searchParams.search}</Heading>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
        <ProductSearchForm />
      </div>

      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg py-10">
           No se encontraron resultados con el término &quot;{searchParams.search}&quot; {/* es el equivalente en eslint6 a "{searchParams.search}" */}
        </p>
      )}
      </>
   </Suspense>
  );
}
