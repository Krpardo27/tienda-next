import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import { categories } from "./data/categories";
import { products } from "./data/products";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const generateDescription = (name: string) => {
  const n = name.toLowerCase();

  let base = "Delicioso producto preparado al momento";

  if (n.includes("café") || n.includes("latte") || n.includes("mocha")) {
    base = "Bebida de café con sabor intenso y notas suaves";
  } else if (n.includes("dona")) {
    base = "Dona fresca con cobertura dulce y textura suave";
  } else if (n.includes("galleta")) {
    base = "Galletas crujientes con sabor casero";
  } else if (n.includes("hamburguesa")) {
    base = "Hamburguesa jugosa con ingredientes seleccionados";
  } else if (n.includes("pizza")) {
    base = "Pizza recién horneada con ingredientes frescos";
  } else if (n.includes("pastel") || n.includes("waffle")) {
    base = "Postre dulce ideal para cualquier momento";
  }

  const variations = [
    "Preparado con ingredientes de alta calidad",
    "Perfecto para cualquier momento del día",
    "Una opción deliciosa y equilibrada",
    "Sabor único que te encantará",
  ];

  return `${base}. ${variations[Math.floor(Math.random() * variations.length)]}`;
};

const generateFlags = (index: number) => ({
  isNew: index % 7 === 0,
  isPopular: index % 5 === 0,
});

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

    const toCLP = (price: number) => {
      const base = Math.round(price * 100);

      return Math.round(base / 10) * 10 - 10;
    };

    const productsWithSlug = products.map((product, index) => {
      const flags = generateFlags(index);

      return {
        ...product,
        price: toCLP(product.price),
        slug: `${slugify(product.name)}-${index}`,
        description: generateDescription(product.name),
        isNew: flags.isNew,
        isPopular: flags.isPopular,
      };
    });

    for (const product of productsWithSlug) {
      await prisma.product.upsert({
        where: {
          slug: product.slug,
        },
        update: {
          description: product.description,
          isNew: product.isNew,
          isPopular: product.isPopular,
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
