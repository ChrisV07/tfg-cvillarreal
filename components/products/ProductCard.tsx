import { formatCurrency, getImagePath } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);

  return (
    <div className="border bg-white rounded-xl shadow-lg flex flex-col h-full">
      <Image
        src={imagePath}
        alt={`Imagen de ${product.name}`}
        width={400}
        height={500}
        className="rounded-t-xl"
        quality={100}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />

      <div className="p-5 flex flex-col justify-between flex-1">
        <div className="flex-1">
          <h3 className="text-xl font-bold line-clamp-3 min-h-20">{product.name}</h3>
          <p className="mt-4 font-black text-3xl text-violet-800">{formatCurrency(product.price)}</p>
        </div>
        <div>
          <AddProductButton product={product} />
        </div>
      </div>
    </div>
  );
}