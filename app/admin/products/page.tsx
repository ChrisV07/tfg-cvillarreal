import ProductSearchForm from "@/components/products/ProductSearchForm";
import Pagination from "@/components/ui/Pagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function productCount() {
  return await prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
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

  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount();

  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  const totalPages = Math.ceil(totalProducts / pageSize);



  return (
    <>

    <div className="text-center">
      <Heading>Administrar Productos</Heading>
    </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href={"/admin/products/new"}
          className="bg-violet-800 rounded-xl w-full lg:w-auto text-xl px-10 py-3 text-white text-center font-bold cursor-pointer hover:bg-violet-600 "
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      {products.length > 0 ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-gray-600 text-lg mt-40 text-center">
          No hay productos disponibles.
        </p>
      )}

      <Pagination page={page} totalPages={totalPages} path="/admin/products" />
    </>
  );
}
