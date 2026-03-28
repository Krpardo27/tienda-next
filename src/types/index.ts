import { Order, OrderProducts, Product } from "../generated/prisma/client";

export type OrderItem = Pick<Product, "id" | "name" | "price" | "image"> & {
  quantity: number;
  subtotal: number;
};

export type OrderWithProducts = Order & {
  orderProducts: (OrderProducts & {
    product: Product;
  })[];
};
