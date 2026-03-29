import { Order, OrderProducts, Product } from "../generated/prisma/client";

// 🔥 CART ITEM (UI - carrito)
// ❌ ya no usamos subtotal (estado derivado)
// ❌ no dependemos directamente de Product
export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// 🔥 ORDER ITEM (para backend si lo necesitas tipado)
// 👉 aquí sí puedes usar estructura alineada con DB
export type OrderItemPayload = {
  productId: number;
  quantity: number;
};

// 🔥 ORDER COMPLETO (para Server Action)
export type OrderPayload = {
  name: string;
  total: number;
  items: OrderItemPayload[];
};

// 🔥 ORDER CON RELACIONES (para admin / dashboard)
export type OrderWithProducts = Order & {
  orderProducts: (OrderProducts & {
    product: Product;
  })[];
};

export type PaginationProps = {
  page: number
  totalPages: number
}

