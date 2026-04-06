"use client";

import { useState } from "react";
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { formatCurrency } from "@/src/utils";
import { createOrderAction } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function OrderSummaryMobile() {
  const [open, setOpen] = useState(false);

  const order = useStore((state) => state.order);
  const clearCart = useStore((state) => state.clearCart);
  const hydrated = useStore((state) => state.hydrated);

  const totalItems = useStore((state) =>
    state.order.reduce((acc, item) => acc + item.quantity, 0)
  );

  const totalPrice = useStore((state) =>
    state.order.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
  );

  if (!hydrated) return null;

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
      total: totalPrice, // ✅ FIX CRÍTICO
      order: order.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    const result = OrderSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    const response = await createOrderAction(result.data);

    if (response?.errors) {
      response.errors.forEach((err: { message: string }) => {
        toast.error(err.message);
      });
      return;
    }

    toast.success("Orden creada correctamente");
    clearCart();
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          md:hidden
          fixed bottom-4 right-4 z-[999]
          bg-black text-white
          px-5 py-3
          rounded-full
          shadow-xl
          active:scale-95
          transition
        "
      >
        🛒 ({totalItems})
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 30,
              }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-black">Mi pedido</h1>

                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-300 transition"
                >
                  <XMarkIcon className="w-6 h-6 text-zinc-700" />
                </button>
              </div>

              {/* CONTENIDO */}
              {order.length === 0 ? (
                <p className="text-center mt-5 text-gray-500">
                  Aún no has agregado ningún producto
                </p>
              ) : (
                <div className="space-y-4">
                  {order.map((item) => (
                    <ProductDetails key={item.id} item={item} />
                  ))}

                  {/* TOTAL */}
                  <div className="border-t pt-4 flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-700">
                      Total
                    </p>

                    <span className="text-xl font-black text-amber-500">
                      {totalItems}{" "}
                      {totalItems === 1 ? "artículo" : "artículos"} -{" "}
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>

                  {/* FORM */}
                  <form action={handleCreateOrder} className="mt-6 space-y-4">
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className="bg-white border border-gray-100 p-2 w-full"
                      name="name"
                    />

                    <input
                      type="submit"
                      className="py-2 rounded-md uppercase text-white font-bold bg-black w-full cursor-pointer"
                      value="Confirmar pedido"
                    />
                  </form>

                  {/* CLEAR */}
                  <button
                    onClick={clearCart}
                    className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
                  >
                    Vaciar carrito
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}