import { ProductWithCategory } from "@/app/dashboard/products/page";
import { formatCurrency } from "@/src/utils";
import Link from "next/link";
import Switch from "../../ui/Switch";
import { toggleProductAvailability } from "@/src/features/products/toggle-product-availability";

type ProductTableProps = {
  products: ProductWithCategory[];
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-zinc-500">
          {products.length} {products.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      <div
        className="
          overflow-hidden rounded-2xl border border-zinc-200
          bg-white shadow-sm ring-1 ring-zinc-950/5
        "
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-50/80 backdrop-blur supports-backdrop-filter:bg-zinc-50/60">
              <tr>
                <th
                  scope="col"
                  className="
                    py-4 pl-6 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500
                  "
                >
                  Producto
                </th>

                <th
                  scope="col"
                  className="
                    px-3 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500
                  "
                >
                  Precio
                </th>

                <th
                  scope="col"
                  className="
                    px-3 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500
                  "
                >
                  Categoría
                </th>

                <th className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Estado
                </th>

                <th scope="col" className="py-4 pl-3 pr-6 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="
                    transition-colors duration-150 hover:bg-zinc-50/80
                  "
                >
                  <td
                    className="
                      py-4 pl-6 pr-3 text-sm font-medium text-zinc-900
                    "
                  >
                    <div className="max-w-65 truncate" title={product.name}>
                      {product.name}
                    </div>
                  </td>

                  <td
                    className="
                      px-3 py-4 text-sm font-medium text-zinc-700
                    "
                  >
                    {formatCurrency(product.price)}
                  </td>

                  <td
                    className="
                      px-3 py-4 text-sm text-zinc-600
                    "
                  >
                    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700">
                      {product.category.name}
                    </span>
                  </td>

                  <td className="px-3 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={product.available}
                        ariaLabel={`Cambiar estado de ${product.name}`}
                        onChange={async (value) => {
                          await toggleProductAvailability(product.id, value);
                        }}
                      />

                      <span
                        className={`inline-flex min-w-20 items-center justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                          product.available
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {product.available ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-4 text-right">
                    <Link
                      href={`/dashboard/products/${product.id}/edit`}
                      className="
                        inline-flex items-center rounded-lg border border-zinc-200 bg-white px-3 py-1.5
                        text-sm font-medium text-zinc-700 shadow-xs
                        transition-colors hover:border-amber-300 hover:text-amber-700
                      "
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
