import { Product } from "@/src/generated/prisma/client"
import { formatCurrency } from "@/src/utils"
import Image from "next/image"
import AddToCartButton from "./AddToCartButton"

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border bg-white h-full rounded-lg overflow-hidden relative ">
      <Image src={`/products/${product.image}.jpg`} alt={`Imagen platillo ${product.name}`} width={400} height={400} className="object-cover" />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-bold text-4xl text-amber-500">{formatCurrency(product.price)}</p>
        <AddToCartButton product={product} />
      </div>
    </div>
  )
}
