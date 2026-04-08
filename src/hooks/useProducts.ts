"use client";

import { useQuery } from "@tanstack/react-query";

export function useProducts(category: string) {
  return useQuery({
    queryKey: ["products", category],
    // queryFn: () => fetchProducts(category),
    staleTime: 1000 * 60 * 5, // 🔥 cache 5 min
  });
}