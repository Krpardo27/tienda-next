"use client";
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import LatestOrderItem from "@/components/order/LatestOrderItem";

export default function OrdersPage() {
  const url = "/orders/api";

  const fetcher = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Error response:", errorData);
      throw new Error(errorData.details || `Error ${res.status}: ${res.statusText}`);
    }
    return res.json();
  };

  const {
    data: orders,
    error,
    isLoading,
  } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-3xl animate-pulse">🍳 Cargando pedidos...</p>
      </div>
    );

  if (error) {
    console.error("Frontend error:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white flex-col">
        <p className="text-2xl font-bold">Error al cargar pedidos</p>
        <p className="text-zinc-400 mt-2">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-white text-black rounded-lg"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (orders)
    return (
      <div className="min-h-screen bg-black px-6 py-10 text-white">
        {/* HEADER */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <Logo />

          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            🍽️ Órdenes Listas
          </h1>

          <p className="text-zinc-400 text-sm md:text-base">
            Retira tu pedido en el mesón
          </p>
        </div>

        {/* GRID */}
        {orders.length ? (
          <div className="max-w-7xl mx-auto">
            <div
              className="
                grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5
                gap-6
              "
            >
              {orders.map((order) => (
                <LatestOrderItem key={order.id} order={order} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <p className="text-3xl text-zinc-400">
              Esperando pedidos...
            </p>
          </div>
        )}
      </div>
    );
}