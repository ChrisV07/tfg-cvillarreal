'use client'

import { formatCurrency, getImagePath } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import AddProductButton from "./AddProductButton";
import { useState, useEffect } from 'react';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Recuperar el conteo del carrito del localStorage al montar el componente
    const storedCount = localStorage.getItem('cartCount');
    if (storedCount) {
      setCartCount(parseInt(storedCount, 10));
    }
  }, []);

  const updateCartCount = (quantity: number) => {
    const newCount = cartCount + quantity;
    setCartCount(newCount);
    localStorage.setItem('cartCount', newCount.toString());
    
    // Disparar un evento personalizado para actualizar el FloatingCartButton
    window.dispatchEvent(new CustomEvent('updateCartCount', { detail: { count: newCount } }));
  };

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