"use client";

import { Category } from "@/src/generated/prisma/client";
import { categoryIcons } from "@/src/shared/config/category-icons";
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

  const Icon = categoryIcons[category.slug];

  return (
    <Link
      href={`/order/${category.slug}`}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group inline-flex items-center gap-3 rounded-xl transition-all duration-300 ease-out mt-2",
        "min-w-max px-3 py-2",
        "border border-transparent hover:border-amber-600/30",
        "active:scale-[0.96]",
        "md:px-4 md:py-3",
        "md:hover:bg-amber-600/10  md:hover:-translate-y-px",
        isActive && "bg-amber-600/15 border-amber-600/30",
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg",
          "size-8 md:size-10",
          "bg-black/5  transition-all duration-300",
          "group-hover:bg-amber-600/20",
          isActive && "bg-amber-600/25",
        )}
      >
        {Icon && (
          <Icon
            className={cn(
              "text-[18px] md:text-[22px] transition-colors duration-300",
              isActive
                ? "text-amber-400"
                : "text-zinc-500  group-hover:text-amber-400"
            )}
          />
        )}
      </div>

      <span
        className={cn(
          "text-xs md:text-sm font-semibold whitespace-nowrap transition-colors duration-200",
          "text-zinc-600  group-hover:text-[#6b7280] ",
          isActive && "text-amber-300",
        )}
      >
        {category.name}
      </span>

      <div className="ml-auto hidden md:flex items-center">
        <span
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            isActive
              ? "bg-amber-500 scale-125"
              : "bg-black/10  group-hover:bg-amber-600/50",
          )}
        />
      </div>
    </Link>
  );
}
