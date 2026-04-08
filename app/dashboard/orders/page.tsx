"use client";
import useSWR from "swr";
import { motion } from "framer-motion";
import { OrderWithProducts } from "@/src/types";
import { api } from "@/src/lib/axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Heading from "@/src/components/ui/Heading";
import OrderCard from "@/src/components/order/OrderCard";

export default function OrdersPage() {
  const url = "/dashboard/orders/api";

  const fetcher = async () => {
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.error || "Error al cargar órdenes",
      );
    }
  };

  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 3000,
    revalidateOnFocus: false,
  });

  const [newOrderIds, setNewOrderIds] = useState<number[]>([]);
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const prevIdsRef = useRef<number[] | null>(null);

  useEffect(() => {
    if (!data) return;

    const currentIds = data.map((order) => order.id);

    if (prevIdsRef.current === null) {
      prevIdsRef.current = currentIds;
      return;
    }

    const newOrders = currentIds.filter(
      (id) => !prevIdsRef.current!.includes(id)
    );

    if (newOrders.length > 0) {
      console.log("🔥 nueva orden:", newOrders);

      setNewOrderIds(newOrders);
      setNewOrdersCount(newOrders.length);

      // 🔊 sonido
      const audio = new Audio("/notification.mp3");
      audio.volume = 0.7;
      audio.play().catch(() => { });

      // 🔥 toast
      toast.success(`Nueva orden (${newOrders.length})`, {
        position: "top-right",
        autoClose: 5000,
      });

      setTimeout(() => {
        setNewOrderIds([]);
        setNewOrdersCount(0);
      }, 5000);
    }

    prevIdsRef.current = currentIds;
  }, [data]);

  const [animatedCount, setAnimatedCount] = useState(0);
  const prevCountRef = useRef(0);

  useEffect(() => {
    if (!data) return;

    const start = prevCountRef.current;
    const end = data.length;

    if (start === end) return;

    const duration = 300;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const value = Math.floor(start + (end - start) * progress);

      setAnimatedCount(value);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    prevCountRef.current = end;
  }, [data]);

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
                  {animatedCount}
                </span>
              </span>

              {/* NUEVO BADGE */}
              {newOrdersCount > 0 && (
                <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  +{newOrdersCount} nuevas
                </span>
              )}

              <div className="flex items-center gap-2 text-zinc-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Actualizando
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="h-px bg-linear-to-r from-transparent via-zinc-300 to-transparent" />
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
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="group relative transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-amber-500/10 to-transparent pointer-events-none" />

                  <div
                    className={`
        rounded-2xl border border-zinc-200 bg-white shadow-xs
        transition-all duration-500
        hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10
        ${newOrderIds.includes(order.id) ? "ring-2 ring-amber-400 bg-amber-50" : ""}
      `}
                  >
                    <OrderCard order={order} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <p className="text-lg font-medium text-zinc-600">
              No hay pedidos pendientes
            </p>
            <p className="text-sm text-zinc-400 mt-2">Todo está al día 🚀</p>
          </div>
        )}
      </div>
    );
}
