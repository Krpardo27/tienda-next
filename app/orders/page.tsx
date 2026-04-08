"use client";

import useSWR from "swr";
import { OrderWithProducts } from "@/src/types";
import { api } from "@/src/lib/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Logo from "@/src/components/ui/Logo";
import LatestOrderItem from "@/src/components/order/LatestOrderItem";

export default function OrdersPage() {
  const url = "/orders/api";

  const fetcher = async () => {
    const { data } = await api.get(url);
    return data;
  };

  const {
    data: orders,
    error,
    isLoading,
  } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
  });

  const audioUnlockedRef = useRef(false);
  const prevIdsRef = useRef<number[] | null>(null);
  const lastSoundRef = useRef(0);

  useEffect(() => {
    const unlock = async () => {
      try {
        const audio = new Audio("/notification.mp3");
        audio.volume = 0;
        await audio.play();

        console.log("🔓 audio desbloqueado");
        audioUnlockedRef.current = true;
      } catch {}

      window.removeEventListener("click", unlock);
    };

    window.addEventListener("click", unlock);
    return () => window.removeEventListener("click", unlock);
  }, []);

  useEffect(() => {
    if (!orders) return;

    const currentIds = orders.map((o) => o.id);

    // 🔴 primer render → solo guardar
    if (prevIdsRef.current === null) {
      prevIdsRef.current = currentIds;
      return;
    }

    // 🔥 detectar nuevas órdenes
    const newOrders = currentIds.filter(
      (id) => !prevIdsRef.current!.includes(id),
    );

    if (newOrders.length > 0) {
      console.log("🍽️ nueva orden detectada:", newOrders);

      playReadySound();
    }

    prevIdsRef.current = currentIds;
  }, [orders]);

  // 🔊 SONIDO CORREGIDO
  function playReadySound() {
    if (!audioUnlockedRef.current) {
      console.log("🔇 audio bloqueado aún");
      return;
    }

    const now = Date.now();

    // 🔥 anti spam
    if (now - lastSoundRef.current < 2000) return;
    lastSoundRef.current = now;

    let count = 0;

    const play = async () => {
      try {
        const audio = new Audio("/ready.mp3");
        audio.volume = 1;

        await audio.play();

        count++;

        if (count < 3) {
          setTimeout(play, 1500);
        }
      } catch (err) {
        console.log("❌ error audio:", err);
      }
    };

    play();
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-3xl animate-pulse">🍳 Cargando pedidos...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white flex-col">
        <p className="text-2xl font-bold">Error al cargar pedidos</p>
        <p className="text-zinc-400 mt-2">{error.message}</p>
      </div>
    );

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
      {orders?.length ? (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ scale: 0.9 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.4 }}
              >
                <LatestOrderItem order={order} />
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <p className="text-3xl text-zinc-400">Esperando pedidos...</p>
        </div>
      )}
    </div>
  );
}
