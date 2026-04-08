"use client";

import { useState } from "react";
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { formatCurrency } from "@/src/utils";
import { createOrderAction } from "@/actions/create-order-action";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { OrderSchema } from "../admin/schema";

export default function OrderSummaryMobile() {
  const [open, setOpen] = useState(false);

  const order = useStore((state) => state.order);
  const clearCart = useStore((state) => state.clearCart);
  const hydrated = useStore((state) => state.hydrated);

  const totalItems = useStore((state) =>
    state.order.reduce((acc, item) => acc + item.quantity, 0)
  );

  const totalPrice = useStore((state) =>
    state.order.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  if (!hydrated) return null;

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
      total: totalPrice,
      order: order.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    const result = OrderSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((err) => toast.error(err.message));
      return;
    }

    const response = await createOrderAction(result.data);

    if (response?.errors) {
      response.errors.forEach((err: { message: string }) =>
        toast.error(err.message)
      );
      return;
    }

    toast.success("Orden creada correctamente");
    clearCart();
    setOpen(false);
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="
    fixed bottom-4 right-4 z-50
    rounded-full bg-black px-4 py-3 text-white
    shadow-lg transition active:scale-95
    lg:hidden
  "  
      >
        🛒
        <span className="text-sm font-semibold">{totalItems}</span>
      </button>
      

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm lg:hidden"
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
                stiffness: 260,
                damping: 28,
              }}
              className="
                absolute bottom-0 left-0 right-0
                bg-white
                rounded-t-3xl
                px-5 pt-5 pb-6
                max-h-[85vh]
                flex flex-col
              "
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-bold">Mi pedido</h1>

                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition"
                >
                  <XMarkIcon className="w-5 h-5 text-zinc-700" />
                </button>
              </div>

              {/* SCROLLABLE CONTENT */}
              <div className="flex-1 overflow-y-auto pr-1">
                {order.length === 0 ? (
                  <p className="text-center mt-10 text-zinc-500">
                    Aún no has agregado productos
                  </p>
                ) : (
                  <div className="space-y-4">
                    {order.map((item) => (
                      <ProductDetails key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>

              {/* FOOTER (sticky UX correcto) */}
              {order.length > 0 && (
                <div className="pt-4 border-t space-y-4">
                  {/* TOTAL */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-zinc-600">
                      Total
                    </p>

                    <span className="text-lg font-bold text-amber-600">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>

                  {/* FORM */}
                  <form
                    action={handleCreateOrder}
                    className="space-y-3"
                  >
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      name="name"
                      className="
                        w-full
                        rounded-lg
                        border border-zinc-200
                        px-3 py-2
                        text-sm
                        focus:outline-none focus:ring-2 focus:ring-amber-300
                      "
                    />

                    <button
                      type="submit"
                      className="
                        w-full
                        py-3
                        rounded-lg
                        text-white
                        font-semibold
                        bg-black
                        active:scale-[0.98]
                        transition
                      "
                    >
                      Confirmar pedido
                    </button>
                  </form>

                  {/* CLEAR */}
                  <button
                    onClick={clearCart}
                    className="
                      w-full
                      py-2
                      text-sm
                      text-red-600
                      hover:underline
                    "
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