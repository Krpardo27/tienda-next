"use server";

import { ProductSchema } from "@/src/features/admin/schema";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProduct(data: unknown, id: string) {
  const result = ProductSchema.safeParse(data);

  if (!result.success) {
    return { errors: result.error.issues };
  }

  const cleanData = {
    ...result.data,
    isPopular: result.data.isPopular ?? false,
    available: result.data.available ?? true,
  };

  await prisma.product.update({
    where: { id },
    data: cleanData,
  });

  revalidatePath("/", "layout");
  revalidatePath(`/dashboard/products`);
}
