import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";



async function getProducts(category: string){
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}

export default async function OrderPage({params}: {params: {category: string}}) {
  const products = await getProducts(params.category)
  
  return (
    <>
    <div className="grid grid-cols-2 justify-between">
    <Heading>Elige y personaliza tu pedido a continuación</Heading>
    <div className="mt-12 ml-32">
    <Link
          href={"/admin/products/new"}
          className="bg-black rounded-xl w-full lg:w-auto text-xl px-10 py-3  text-white text-center font-bold cursor-pointer  hover:bg-slate-800 "
        >
          Mozo Virtual
        </Link>

    </div>
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
    {
    products.map(product => (
        <ProductCard 
            key={product.id}
            product={product}
        />
    ))
    }
</div>
</>
  )
}
