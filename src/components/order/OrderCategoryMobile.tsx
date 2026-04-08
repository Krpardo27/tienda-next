"use client";

import { useEffect, useState } from "react";
import { Category } from "@/src/generated/prisma/client";
import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";

type Props = {
  categories: Category[];
};

export default function OrderCategoryMobile({ categories }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="lg:hidden sticky top-0 z-50">
      <div
        className={`border-b border-zinc-200 flex justify-center bg-white transition-all duration-300 ${
          scrolled ? "py-1" : "py-3"
        }`}
      >
        <Logo size={scrolled ? "sm" : "md"} />
      </div>

      <div className="bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-xs">
        <div className="flex gap-3 overflow-x-auto px-3 py-3 *:shrink-0 w-full">
          {categories.map((category) => (
            <CategoryIcon key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
