"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleProductAvailability(id: string, value: boolean) {
  await prisma.product.update({
    where: { id },
    data: {
      available: value,
    },
  });

  revalidatePath("/dashboard/products");
}