import Link from "next/link";
import { PaginationProps } from "@/src/types";

export default function ProductsPagination({
  page,
  totalPages,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const start = Math.max(page - 2, 0);
  const end = Math.min(page + 1, totalPages);

  const visiblePages = pages.slice(start, end + 1);

  return (
    <nav className="flex justify-center py-10 gap-1">
      {page > 1 && (
        <Link
          scroll={false}
          href={`/dashboard/products?page=${page - 1}`}
          className="px-3 py-2 bg-white border rounded-sm hover:bg-zinc-100"
        >
          &laquo;
        </Link>
      )}

      {visiblePages.map((p) => (
        <Link
          key={p}
          scroll={false}
          href={`/dashboard/products?page=${p}`}
          aria-current={page === p ? "page" : undefined}
          className={`px-3 py-2 border rounded ${
            page === p
              ? "bg-amber-400 text-white pointer-events-none"
              : "bg-white text-gray-900 hover:bg-zinc-100"
          }`}
        >
          {p}
        </Link>
      ))}

      {page < totalPages && (
        <Link
          scroll={false}
          href={`/dashboard/products?page=${page + 1}`}
          className="px-3 py-2 bg-white border rounded-sm hover:bg-zinc-100"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
