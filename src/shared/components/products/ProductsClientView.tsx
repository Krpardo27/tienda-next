"use client";

import { useDeferredValue, useEffect, useState } from "react";
import { ProductWithCategory } from "@/app/dashboard/products/page";
import ProductSearchForm from "@/src/components/products/ProductSearchForm";
import ProductTable from "@/src/components/products/ProductTable";

export default function ProductsClientView({
  initialProducts,
}: {
  initialProducts: ProductWithCategory[];
}) {
  const [search, setSearch] = useState("");

  const deferredSearch = useDeferredValue(search);

  const [products, setProducts] =
    useState<ProductWithCategory[]>(initialProducts);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function searchProducts() {
      if (deferredSearch.trim().length < 2) {
        setProducts(initialProducts);
        return;
      }

      try {
        setLoading(true);

        const res = await fetch(
          `/api/products/search?search=${encodeURIComponent(
            deferredSearch
          )}`
        );

        if (!res.ok) {
          throw new Error("Error searching products");
        }

        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    searchProducts();
  }, [deferredSearch, initialProducts]);

  return (
    <>
      <div className="flex mb-6 justify-end">
        <ProductSearchForm
          value={search}
          onChange={setSearch}
        />
      </div>

      {loading ? (
        <div className="py-10 text-center text-zinc-500">
          Buscando productos...
        </div>
      ) : products.length === 0 ? (
        <div className="py-16 text-center border rounded-xl bg-white">
          <p className="text-lg font-semibold text-zinc-700">
            No se encontraron productos
          </p>

          <p className="text-sm text-zinc-400 mt-2">
            Intenta con otro término
          </p>
        </div>
      ) : (
        <ProductTable products={products} />
      )}
    </>
  );
}