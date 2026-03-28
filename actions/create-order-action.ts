"use server";
import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema";

export async function createOrderAction(data: unknown) {
  // console.log("Creando orden...", data);
  const result = OrderSchema.safeParse(data);
  console.log(result.success);

  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  try {
    // console.log(data);
    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        orderProducts: {
          create: result.data.order.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errors: [{ message: "Error al crear la orden" }],
    };
  }
}
