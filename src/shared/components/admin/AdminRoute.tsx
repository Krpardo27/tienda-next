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

  const isActive =
    link.url === "/"
      ? pathname === "/"
      : pathname.startsWith(link.url);

  return (
    <Link
      href={link.url}
      target={link.blank ? "_blank" : "_self"}
      className={`
        group relative flex items-center
        rounded-xl
        px-4 py-3
        text-sm font-medium
        transition-all duration-200
        ${
          isActive
            ? `
              bg-amber-500/12
              text-amber-500
            `
            : `
              text-[var(--muted)]
              hover:bg-[var(--surface-secondary)]
              hover:text-[var(--foreground)]
            `
        }
      `}
    >
      {/* Active indicator */}
      <span
        className={`
          absolute left-0 top-1/2 h-6 w-1
          -translate-y-1/2 rounded-r-full
          transition-all duration-200

          ${
            isActive
              ? "bg-amber-500 opacity-100"
              : "opacity-0"
          }
        `}
      />

      <span className="pl-2">
        {link.text}
      </span>
    </Link>
  );
}