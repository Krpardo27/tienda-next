"use client";

import {
  useDeferredValue,
  useEffect,
  useState,
} from "react";

import { ProductWithCategory } from "@/app/dashboard/products/page";

import ProductSearchForm from "@/src/shared/components/forms/ProductSearchForm";
import ProductTable from "@/src/shared/components/products/ProductTable";

type Props = {
  initialProducts: ProductWithCategory[];
};

export default function ProductsClientView({
  initialProducts,
}: Props) {
  const [search, setSearch] = useState("");

  const deferredSearch = useDeferredValue(search);

  const [products, setProducts] =
    useState<ProductWithCategory[]>(initialProducts);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        if (deferredSearch.trim().length === 0) {
          setProducts(initialProducts);
          setLoading(false);

          return;
        }

        setLoading(true);

        const res = await fetch(
          `/api/products/search?search=${encodeURIComponent(
            deferredSearch
          )}`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) {
          throw new Error("Error searching products");
        }

        const data: ProductWithCategory[] =
          await res.json();

        if (!controller.signal.aborted) {
          setProducts(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 150);

    return () => {
      clearTimeout(timeout);

      controller.abort();
    };
  }, [deferredSearch, initialProducts]);

  return (
    <>
      <div className="mb-4 flex">
        <ProductSearchForm
          value={search}
          onChange={setSearch}
        />
      </div>

      <div className="relative">
        {loading && (
          <div className="absolute right-4 top-4 z-10 text-sm text-zinc-500">
            Buscando...
          </div>
        )}

        <div
          className={`transition-opacity duration-200 ${
            loading ? "opacity-60" : "opacity-100"
          }`}
        >
          {products.length === 0 ? (
            <div className="rounded-lg border  py-10 text-center">
              <p className="text-xl font-semibold text-zinc-900 ">
                No hay productos
              </p>

              <p className="mt-2 text-gray-500 ">
                No se encontraron resultados.
              </p>
            </div>
          ) : (
            <ProductTable products={products} />
          )}
        </div>
      </div>
    </>
  );
}