"use client";
import { useEffect, useState } from "react";
import { Category } from "@/src/generated/prisma/client";
import CategoryIcon from "../../shared/ui/CategoryIcon";
import Logo from "../../shared/ui/Logo";

type Props = {
  categories: Category[];
};

export default function OrderCategoryMobile({ categories }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 isolate lg:hidden">
      <div
        className={`relative z-50 flex justify-center border-b border-(--border) bg-white/95 backdrop-blur-md transition-all duration-300 ${scrolled ? "py-1 shadow-sm" : "py-3"
          }`}
      >
        <Logo size={scrolled ? "sm" : "md"} />
      </div>

      <div className="relative z-50 border-b border-(--border) bg-white/95 backdrop-blur-md shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
        <div className="flex gap-3 overflow-x-auto px-3 py-3 *:shrink-0 w-full">
          {categories.map((category) => (
            <CategoryIcon key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}