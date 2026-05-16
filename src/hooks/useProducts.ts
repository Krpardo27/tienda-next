"use client";

import useSWR from "swr";
import { fetchProducts } from "../api/products";

export function useProducts(category: string) {
  const key = category ? ["products", category] : null;

  const { data, isLoading, error } = useSWR(
    key,
    ([, currentCategory]) => fetchProducts(currentCategory),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    data,
    isLoading,
    error: error instanceof Error ? error : null,
  };
}