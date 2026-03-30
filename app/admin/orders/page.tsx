"use client";
import useSWR from "swr";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";

export default function OrdersPage() {
  const url = "/admin/orders/api";

  const fetcher = async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al cargar órdenes");
    return res.json();
  };

  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-lg font-medium text-zinc-600 animate-pulse">
          Cargando pedidos...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <p className="text-lg font-semibold text-red-600">
          Error al cargar los pedidos
        </p>
      </div>
    );

  if (data)
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-8">
        {/* HEADER */}
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Heading>Administrar Pedidos</Heading>

            {/* STATUS BAR */}
            <div className="flex items-center gap-4 text-sm">
              <span className="text-zinc-500">
                Total:{" "}
                <span className="font-bold text-amber-600">
                  {data.length}
                </span>
              </span>

              <div className="flex items-center gap-2 text-zinc-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Actualizando
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
        </div>

        {/* CONTENT */}
        {data.length ? (
          <div className="max-w-7xl mx-auto mt-8">
            <div
              className="
                grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6
              "
            >
              {data.map((order) => (
                <div
                  key={order.id}
                  className="
                    group relative
                    transition-all duration-300
                  "
                >
                  {/* Glow hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />

                  <div
                    className="
                      bg-white border border-zinc-200
                      rounded-2xl
                      shadow-sm
                      hover:shadow-xl hover:shadow-black/10
                      transition-all duration-300
                      hover:-translate-y-1
                    "
                  >
                    <OrderCard order={order} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <p className="text-lg font-medium text-zinc-600">
              No hay pedidos pendientes
            </p>
            <p className="text-sm text-zinc-400 mt-2">
              Todo está al día 🚀
            </p>
          </div>
        )}
      </div>
    );
}