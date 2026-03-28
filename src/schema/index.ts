import { z } from "zod";

export const OrderSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  total: z.number().min(1, "El total debe ser mayor a 0"),
  order: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number(),
      }),
    )
    .min(1, "El pedido no puede estar vacío"),
});

export const OrderIdSchema = z.object({
  orderId: z
    .string()
    .regex(/^\d+$/, { message: "Debe ser un número válido" })
    .transform((value) => Number(value))
    .refine((value) => value > 0, { message: "Debe ser mayor a 0" }),
});

export const SearchProductSchema = z.object({
  search: z.string().trim().min(1, "La búsqueda no puede estar vacía")
});

export const ProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "El Nombre del Producto no puede ir vacio" }),
  price: z
    .string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: "Precio no válido" })
    .or(z.number().min(1, { message: "El Precio es Obligatorio" })),
  categoryId: z
    .string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: "La Categoría es Obligatoria" })
    .or(z.number().min(1, { message: "La Categoría es Obligatoria" })),
});
