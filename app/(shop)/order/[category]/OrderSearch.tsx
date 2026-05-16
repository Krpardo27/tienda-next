"use client";

import ProductSearchForm from "@/src/shared/components/forms/ProductSearchForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderSearch({
  initialValue,
}: {
  initialValue: string;
}) {
  const [search, setSearch] = useState(initialValue);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.replace(`?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <ProductSearchForm
      value={search}
      onChange={setSearch}
    />
  );
}