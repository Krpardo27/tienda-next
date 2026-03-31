"use client";

import { Product } from "@/src/generated/prisma/client";
import { useStore } from "@/src/store";
import { useState } from "react";
import { toast } from "react-toastify";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useStore((state) => state.addToCart);

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (added) return; // 🔥 evita spam

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    toast.success(`🛒 ${product.name} agregado`);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 800);
  };

  return (
    <button
      onClick={handleAdd}
      type="button"
      disabled={added}
      className={`
        mt-5 w-full py-2 px-4 rounded
        text-white transition-all duration-200
        ${
          added
            ? "bg-green-600"
            : "bg-amber-500 hover:bg-amber-700 active:scale-95"
        }
      `}
    >
      {added ? "Agregado" : "Agregar al carrito"}
    </button>
  );
}
