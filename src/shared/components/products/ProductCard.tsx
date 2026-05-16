"use client";

import { Product } from "@/src/generated/prisma/client";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useRef } from "react";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image ?? "");

  const isRecentlyCreated =
    new Date(product.createdAt).getTime() >
    Date.now() - 1000 * 60 * 60 * 24 * 7;

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
      className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:border-amber-500/30 hover:shadow-xl hover:shadow-black/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {imagePath ? (
          <Image
            src={imagePath}
            alt={product.name}
            fill
            sizes="(min-width:768px) 320px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[var(--surface-secondary)] text-sm text-[var(--muted)]">
            Sin imagen
          </div>
        )}

        <div className="absolute left-3 top-3 flex gap-2">
          {isRecentlyCreated && (
            <span className="rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
              Nuevo
            </span>
          )}

          {product.isPopular && (
            <span className="rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-semibold text-white">
              Popular
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex-1 text-base font-semibold text-[var(--foreground)]">
            {product.name}
          </h3>

          <div className="shrink-0 rounded-xl bg-amber-500/10 px-3 py-1.5 text-sm font-bold text-amber-600">
            {formatCurrency(product.price)}
          </div>
        </div>

        {product.description && (
          <p className="text-sm text-[var(--muted)]">{product.description}</p>
        )}
      </div>
    </motion.article>
  );
}
