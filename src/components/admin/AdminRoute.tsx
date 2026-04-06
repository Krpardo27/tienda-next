"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  };
};

export default function AdminRoute({ link }: AdminRouteProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(link.url);

  return (
    <Link
      href={link.url}
      target={link.blank ? "_blank" : "_self"}
      className={`
        group flex items-center gap-3
        rounded-xl
        transition-all duration-200

        /* 🔥 MOBILE (scroll horizontal / botones) */
        min-w-max px-4 py-2
        text-sm font-semibold
        bg-white border border-zinc-200
        active:scale-[0.96]

        md:w-full md:px-4 md:py-3
        md:bg-transparent md:border-transparent
        md:text-base md:font-medium

        hover:bg-zinc-100
        md:hover:bg-zinc-100/80
        md:hover:shadow-sm
        md:hover:-translate-y-[1px]

        ${
          isActive
            ? "bg-amber-500 text-white border-amber-500 shadow-sm md:bg-amber-100 md:text-amber-700 md:border-transparent"
            : "text-zinc-700"
        }
      `}
    >
      <span
        className={`
          hidden md:block w-1 h-5 rounded-full transition-all
          ${isActive ? "bg-amber-500" : "bg-transparent"}
        `}
      />

      {link.text}
    </Link>
  );
}
