"use server";

import { OrderSchema } from "@/src/components/admin/schema";
import { prisma } from "@/src/lib/prisma";

export async function createOrderAction(data: unknown) {
  const result = OrderSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  try {
    const items = result.data.order;

    // 1. Obtener productos reales desde DB
    const productIds = items.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    // 2. Crear mapa para lookup rápido
    const productMap = new Map(
      products.map((p) => [p.id, p])
    );

    // 3. Recalcular total REAL
    let total = 0;

    for (const item of items) {
      const product = productMap.get(item.productId);

      if (!product) {
        return {
          errors: [{ message: "Producto inválido" }],
        };
      }

      total += product.price * item.quantity;
    }

    // 4. Crear orden con total seguro
    await prisma.order.create({
      data: {
        name: result.data.name,
        total, // ✅ recalculado, no del cliente
        orderProducts: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    });

    return { success: true };

  } catch (error) {
    console.log(error);
    return {
      errors: [{ message: "Error al crear la orden" }],
    };
  }
}