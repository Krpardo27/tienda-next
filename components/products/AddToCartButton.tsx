'use client'

import { Product } from "@/src/generated/prisma/client"
import { useStore } from "@/src/store"


type AddToCartButtonProps = {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useStore((state) => state.addToCart)

  return (
    <button
      onClick={() => addToCart(product)}
      type="button"
      className="mt-5 bg-amber-500 hover:bg-amber-700 transition-all duration-200 text-white py-2 px-4 rounded w-full"
    >Agregar
    </button>
  )
}
