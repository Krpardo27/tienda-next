import { Product } from "@/src/generated/prisma/client"
import { formatCurrency, getImagePath } from "@/src/utils"
import Image from "next/image"
import AddToCartButton from "./AddToCartButton"
import Link from "next/link"

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {

  console.log(product);

  const imagePath = getImagePath(product.image)

  return (
    <article
      className="
        group relative flex flex-col h-full
        rounded-3xl overflow-hidden
        bg-white
        border border-zinc-200/60
        shadow-sm hover:shadow-xl
        transition-all duration-300 ease-out
        hover:-translate-y-2
      "
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-100">

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {product.isNew && (
            <span className="
              text-[10px] px-2 py-1 rounded-full
              bg-emerald-500 text-white shadow font-medium
            ">
              Nuevo
            </span>
          )}

          {product.isPopular && (
            <span className="
              text-[10px] px-2 py-1 rounded-full
              bg-amber-500 text-white shadow font-medium
            ">
              🔥 Popular
            </span>
          )}
        </div>

        {/* IMAGE */}
        <Image
          src={imagePath}
          alt={product.name}
          loading="eager"
          fill
          sizes="(min-width: 768px) 300px, 100vw"
          className="
            object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-110
          "
        />
        {/* <div className="
  absolute inset-0 flex items-center justify-center
  opacity-0 group-hover:opacity-100
  transition
">
          <Link
            href={`/product/${product.slug}`}
            className="
    bg-white text-black px-4 py-2 rounded-full shadow
    text-sm font-semibold
  "
          >
            Ver detalle
          </Link>
        </div> */}

        {/* OVERLAY */}
        <div className="
          absolute inset-0
          bg-gradient-to-t from-black/60 via-black/10 to-transparent
          opacity-70 group-hover:opacity-90
          transition
        " />

        {/* PRICE FLOAT */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="
            bg-white/95 backdrop-blur
            text-amber-600 font-bold
            px-3 py-1.5 rounded-full text-sm shadow-md
          ">
            {formatCurrency(product.price)}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-5">

        {/* TITLE */}
        <h3 className="
          text-base font-semibold text-zinc-800
          group-hover:text-black
          transition line-clamp-2
        ">
          {product.name}
        </h3>

        {/* DESCRIPTION */}
        {product.description && (
          <p className="
            mt-1 text-sm text-zinc-500 
          ">
            {product.description}
          </p>
        )}

        {/* META EXTRA (detalle PRO) */}
        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
          {product.isPopular && <span>🔥 Trending</span>}
          {product.isNew && <span>🆕 Nuevo</span>}
        </div>

        {/* SPACER */}
        <div className="flex-1" />

        {/* CTA */}
        <div className="
          mt-4 opacity-95 group-hover:opacity-100
          transition
        ">
          <AddToCartButton product={product} />
        </div>
      </div>

      {/* HOVER RING */}
      <div className="
        pointer-events-none absolute inset-0 rounded-3xl
        ring-0 group-hover:ring-2 ring-amber-400/30
        transition
      " />
    </article>
  )
}