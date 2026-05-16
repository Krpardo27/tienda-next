"use server";

import { ProductSchema } from "@/src/features/admin/schema";
import { prisma } from "@/src/lib/prisma";
import slugify from "slugify";

export async function createProductAction(data: unknown) {
  const result = ProductSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  const { name } = result.data;

  const slug = slugify(name, {
    lower: true,
    strict: true,
  });

  await prisma.product.create({
    data: {
      ...result.data,
      slug,
      isPopular: result.data.isPopular ?? false,
      available: result.data.available ?? true,
    },
  });
}
