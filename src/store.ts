import { create } from "zustand";
import { CartItem } from "./types";
import { persist } from "zustand/middleware";

interface Store {
  order: CartItem[];
  favorites: number[];
  hydrated: boolean;

  addToCart: (item: CartItem) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;

  toggleFavorite: (id: number) => void;
  // getTotal: () => number;

  setHydrated: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      order: [],
      favorites: [],
      hydrated: false,

      // 🔥 HYDRATION FIX
      setHydrated: () => set({ hydrated: true }),

      addToCart: (item) => {
        const safePrice = Number(item.price);
        const safeQuantity = Number(item.quantity);

        if (isNaN(safePrice) || isNaN(safeQuantity)) {
          console.error("Item inválido en carrito", item);
          return;
        }

        set((state) => {
          const existing = state.order.find((p) => p.id === item.id);

          if (existing) {
            return {
              order: state.order.map((p) =>
                p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
              ),
            };
          }

          return {
            order: [
              ...state.order,
              {
                ...item,
                price: safePrice, // 🔥 normalizado
                quantity: safeQuantity,
              },
            ],
          };
        });
      },

      increaseQuantity: (id) => {
        set((state) => ({
          order: state.order.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }));
      },

      decreaseQuantity: (id) => {
        set((state) => ({
          order: state.order
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          order: state.order.filter((item) => item.id !== id),
        }));
      },

      clearCart: () => set({ order: [] }),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id],
        })),

      // getTotal: () => {
      //   return get().order.reduce(
      //     (acc, item) =>
      //       acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
      //     0,
      //   );
      // },
    }),
    {
      name: "cart-storage", // 🔥 clave localStorage
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        state.order = state.order.map((item) => ({
          ...item,
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 1,
        }));

        state.setHydrated();
      },
    },
  ),
);
