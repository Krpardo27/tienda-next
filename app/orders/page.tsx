"use client";
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import LatestOrderItem from "@/components/order/LatestOrderItem";

export default function OrdersPage() {
  const url = "/orders/api";
  const fetcher = () =>
    fetch(url).then((res) => res.json().then((data) => data));

  const {
    data: orders,
    error,
    isLoading,
  } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <p className="text-center">Cargando pedidos...</p>;
  if (error) return <p className="text-center">Error al cargar los pedidos</p>;

  if (orders)
    return (
      <>
        <h1 className="text-center mt-20 text-6xl font-black">
          Órdenes Listas
        </h1>
        <Logo />

        {orders.length ? (
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-5 mt-5">
            {orders.map((order) => (
              <LatestOrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center mt-5">No hay órdenes disponibles</p>
        )}
      </>
    );
}
