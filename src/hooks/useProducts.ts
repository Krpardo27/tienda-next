"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";

export function useProducts(category: string) {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProducts(category),
    staleTime: 1000 * 60 * 5, 
  });
}