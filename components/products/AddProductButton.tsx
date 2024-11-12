"use client"

import { useState, useEffect } from 'react';
import { Product } from "@prisma/client";
import { useStore } from "@/src/store";
import { PlusIcon, MinusIcon } from 'lucide-react';

type AddProductButtonProps = {
  product: Product;
}

export default function AddProductButton({ product }: AddProductButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const addToOrder = useStore((state) => state.addToOrder);
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToOrder(product);
    }
    updateFloatingCartCount(quantity);
    setQuantity(1);
  };

  const updateFloatingCartCount = (addedQuantity: number) => {
    const currentCount = parseInt(localStorage.getItem('cartCount') || '0', 10);
    const newCount = currentCount + addedQuantity;
    localStorage.setItem('cartCount', newCount.toString());
    window.dispatchEvent(new CustomEvent('updateCartCount', { detail: { count: newCount } }));
  };

  return (
    <div className="mt-5">
      <button
        type="button"
        className="bg-pink-600 hover:bg-pink-800 text-white w-full p-3 uppercase font-bold cursor-pointer rounded-xl"
        onClick={handleAddToCart}
      >
        Agregar
      </button>
    </div>
  );
}