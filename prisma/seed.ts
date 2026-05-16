import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import { categories } from "./data/categories";
import { products } from "./data/products";

export type SeedProduct = {
  name: string;
  slug: string;
  description?: string;
  price: number;
  image?: string;
  categorySlug: string;
  isPopular?: boolean;
  featured?: boolean;
  available?: boolean;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const generateFlags = (index: number) => ({
  isPopular: index % 5 === 0,
});

async function main() {
  try {
    for (const category of categories) {
      await prisma.category.upsert({
        where: {
          slug: category.slug,
        },
        update: {
          name: category.name,
        },
        create: {
          id: category.id,
          name: category.name,
          slug: category.slug,
        },
      });
    }

    const categoryRecords = await prisma.category.findMany({
      select: {
        id: true,
        slug: true,
      },
    });

    const categoryIdBySlug = new Map(
      categoryRecords.map((category) => [category.slug, category.id]),
    );

    for (const category of categories) {
      if (!category.parentSlug) {
        continue;
      }

      const parentId = categoryIdBySlug.get(category.parentSlug);

      if (!parentId) {
        throw new Error(
          `No se encontró parentSlug '${category.parentSlug}' para '${category.slug}'`,
        );
      }

      await prisma.category.update({
        where: {
          slug: category.slug,
        },
        data: {
          parentId,
        },
      });
    }

    const productsForSeed = products.map((product, index) => {
      const categoryId = categoryIdBySlug.get(product.categorySlug);
      const flags = generateFlags(index);

      if (!categoryId) {
        throw new Error(
          `No se encontró categoría '${product.categorySlug}' para producto '${product.slug}'`,
        );
      }

      return {
        name: product.name,
        slug: product.slug,
        price: product.price,
        description: product.description,
        image: product.image,
        isPopular: product.isPopular ?? flags.isPopular,
        featured: product.featured ?? false,
        available: product.available ?? true,
        categoryId,
      };
    });

    for (const product of productsForSeed) {
      await prisma.product.upsert({
        where: {
          slug: product.slug,
        },
        update: {
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          isPopular: product.isPopular,
          featured: product.featured,
          available: product.available,
          categoryId: product.categoryId,
        },
        create: product,
      });
    }

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
