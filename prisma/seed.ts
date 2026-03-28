import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import { categories } from "./data/categories";
import { products } from "./data/products";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

async function main() {
  try {
    await prisma.category.createMany({
      data: categories,
    });

    const productsWithSlug = products.map((product, index) => ({
      ...product,
      slug: `${slugify(product.name)}-${index}`,
    }));

    await prisma.product.createMany({
      data: productsWithSlug,
    });

    console.log("✅ Seed ejecutado correctamente");
  } catch (error) {
    console.error("❌ Error en seed:", error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
