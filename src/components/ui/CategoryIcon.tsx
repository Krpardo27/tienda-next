"use client";

import { Category } from "@/src/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams();

  const currentCategory = Array.isArray(params?.category)
    ? params.category[0]
    : params?.category;

  const isActive = category.slug === currentCategory;

  return (
    <Link
      href={`/order/${category.slug}`}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        // 🔥 BASE
        "group flex items-center gap-3 rounded-xl transition-all duration-300 ease-out",

        // 🔥 MOBILE
        "min-w-max px-3 py-2",
        "bg-white border-transparent border hover:border-amber-300 hover:shadow-sm",
        "active:scale-[0.96]",

        // 🔥 DESKTOP HOVER (más coherente con amber)
        "md:w-full md:px-4 md:py-3 border-transparent hover:border-amber-300 hover:bg-amber-50 hover:shadow-sm",
        "md:hover:bg-amber-50",
        "md:hover:shadow-sm",
        "md:hover:-translate-y-[1px]",
        "md:hover:ring-1 md:hover:ring-amber-200",

        // 🔥 ACTIVE (refinado)
        isActive &&
          "bg-amber-200 border-amber-300 shadow-sm ring-1 ring-amber-300",
      )}
    >
      {/* ICON */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg",
          "size-8 md:size-12",
          "bg-amber-100 transition-all duration-300",

          "group-hover:bg-amber-200",
          "group-hover:shadow-md",

          isActive && "bg-amber-300 shadow-md",
        )}
      >
        <Image
          src={`/icon_${category.slug}.svg`}
          alt={category.name}
          fill
          sizes="48px"
          className="object-contain p-1 md:p-2"
        />
      </div>

      {/* TEXT */}
      <span
        className={cn(
          "text-xs md:text-sm font-semibold whitespace-nowrap transition-colors duration-200",
          "text-zinc-700 group-hover:text-zinc-900",
          isActive && "text-amber-900",
        )}
      >
        {category.name}
      </span>

      <div className="ml-auto hidden md:block">
        <span
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            isActive
              ? "bg-amber-600 scale-125"
              : "bg-zinc-300 group-hover:bg-amber-400",
          )}
        />
      </div>
    </Link>
  );
}
