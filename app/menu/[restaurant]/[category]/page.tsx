import StoreCurrentUrl from "@/components/auth/StoreCurrentUrl";
import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";

async function getProducts(category: string, restaurantID: string) {
  const products = await prisma.product.findMany({
    where: {
      restaurantID: restaurantID,
      category: {
        slug: category,
      },
    },
  });
  return products;
}

export default async function OrderPage({ params }: { params: { category: string; restaurant: string } }) {
  const products = await getProducts(params.category, params.restaurant);

  return (
    <div className="flex-1">
      <div className="flex flex-col lg:flex-row items-center justify-between p-5 space-y-5 lg:space-y-0">
        <Heading>Elige y personaliza tu pedido a continuación</Heading>
        <div className="flex justify-center lg:justify-end w-full lg:w-auto">
          <Link
            href={"/mozo_virtual"}
            className="bg-black rounded-xl text-xl px-10 py-3 text-white text-center font-bold cursor-pointer hover:bg-slate-800"
          >
            Mozo Virtual
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

        <StoreCurrentUrl />

    </div>
  );
}