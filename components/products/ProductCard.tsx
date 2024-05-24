import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product} : ProductCardProps) {
  
  const imagePath = getImagePath(product.image)
  
  return (
    <div className="border bg-white rounded-xl shadow-lg">

        <Image 
            src={imagePath}
            alt={`Imagen de ${product.name}`}
            width={400}
            height={500}
            className="rounded-t-xl"
            quality={85}
        />

        <div className="p-5">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="mt-5 font-black text-4xl text-violet-800">{formatCurrency(product.price)}</p>
            <AddProductButton 
                product = {product}/>    
        </div>

    </div>
  )
}
