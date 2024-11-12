'use client'

import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useStore } from "@/src/store";

export default function FloatingCartButton() {
  const [cartCount, setCartCount] = useState(0)
  const order = useStore((state) => state.order)

  useEffect(() => {
    const storedCount = localStorage.getItem('cartCount')
    if (storedCount) {
      setCartCount(parseInt(storedCount, 10))
    }

    const updateCartCount = (e: CustomEvent) => {
      const newCount = e.detail.count
      setCartCount(newCount)
    }

    window.addEventListener('updateCartCount' as any, updateCartCount)

    return () => {
      window.removeEventListener('updateCartCount' as any, updateCartCount)
    }
  }, [])

  useEffect(() => {
    setCartCount(order.length)
    localStorage.setItem('cartCount', order.length.toString())
  }, [order])

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  }

  return (
    cartCount > 0 && ( // Solo renderiza el botón si cartCount es mayor que 0
      <button
        onClick={scrollToBottom}
        className="fixed bottom-4 right-4 bg-pink-600 text-white rounded-full p-3 shadow-lg md:hidden z-50"
        aria-label="Ver carrito"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {cartCount}
          </span>
        )}
      </button>
    )
  )
}
