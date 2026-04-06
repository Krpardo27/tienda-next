'use client'

import { useState } from "react"
import ProductCard from "./ProductCard"
import { Product } from "@/src/generated/prisma/client"

type ProductFiltersProps = {
  products: Product[]
}

export default function ProductFilters({ products }: ProductFiltersProps) {
  const [filter, setFilter] = useState<"all" | "popular" | "new">("all")

  const filtered = products.filter(p => {
    if (filter === "popular") return p.isPopular
    if (filter === "new") return p.isNew
    return true
  })

  return (
    <>
      <div className="flex gap-2 mb-6">
        <button onClick={() => setFilter("all")}>Todos</button>
        <button onClick={() => setFilter("popular")}>🔥 Populares</button>
        <button onClick={() => setFilter("new")}>🆕 Nuevos</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  )
}