import { prisma } from "@/src/lib/prisma";
import OrderCategoryMobile from "./OrderCategoryMobile";

export default async function OrderCategoryMobileWrapper() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return <OrderCategoryMobile categories={categories} />;
}