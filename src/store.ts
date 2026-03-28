import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "./generated/prisma/client";

interface Store {
  order: OrderItem[];

  addToCart: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  removeItem: (id: Product["id"]) => void;
  clearCart: () => void;

  getTotal: () => number;
}

export const useStore = create<Store>((set, get) => ({
  order: [],

  // ✅ ADD
  addToCart: (product) => {
    set((state) => {
      const existing = state.order.find((item) => item.id === product.id);

      if (existing) {
        return {
          order: state.order.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  subtotal: (item.quantity + 1) * item.price,
                }
              : item,
          ),
        };
      }

      const { id, name, price, image } = product;

      return {
        order: [
          ...state.order,
          {
            id,
            name,
            price,
            image,
            quantity: 1,
            subtotal: price,
          },
        ],
      };
    });
  },

  // ✅ INCREASE
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price,
            }
          : item,
      ),
    }));
  },

  // ✅ DECREASE (elimina si llega a 0)
  decreaseQuantity: (id) => {
    set((state) => ({
      order: state.order
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: (item.quantity - 1) * item.price,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  // ✅ REMOVE directo
  removeItem: (id) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }));
  },

  // ✅ CLEAR
  clearCart: () => {
    set(() => ({ order: [] }));
  },

  // ✅ TOTAL (derivado)
  getTotal: () => {
    return get().order.reduce((acc, item) => acc + item.subtotal, 0);
  },
}));
