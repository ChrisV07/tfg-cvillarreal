import ProductSearchForm from "@/components/products/ProductSearchForm";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductTable from "@/components/products/ProductsTable";
import { UserButton } from "@/components/auth/user-button";
import { Suspense } from "react";

async function productCount() {
  return await prisma.product.count();
}

async function getProducts() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;

  const productsData = getProducts();
  const totalProductsData = productCount();

  const [products] = await Promise.all([
    productsData,
    totalProductsData,
  ]);

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <>
      <div className="flex justify-end">
        <UserButton />
      </div>
      <div className="text-center">
        <Heading>Administrar Productos</Heading>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href={"/admin/products/new"}
          className="bg-violet-800 rounded-xl w-full lg:w-auto text-xl px-10 py-3 text-white text-center font-bold cursor-pointer hover:bg-violet-600"
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      <ProductTable
        products={products}
        initialPage={page}
        pageSize={pageSize}
      />
   </>
    </Suspense>
  );
}
