import { notFound } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import Heading from "@/src/components/ui/Heading";
import ProductCard from "@/src/components/products/ProductCard";

type Props = {
  params: Promise<{ category: string }>;
};

async function getProducts(category: string) {
  const categoryData = await prisma.category.findUnique({
    where: { slug: category },
    select: { id: true },
  });

  if (!categoryData) {
    notFound();
  }

  return prisma.product.findMany({
    where: {
      categoryId: categoryData.id,
    },
  });
}

export default async function OrderPage({ params }: Props) {
  const { category } = await params;

  const products = await getProducts(category);

  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Heading>
          Elige y personaliza tu pedido a continuación
        </Heading>

        <div
          className="
        mt-8
        grid
        gap-5
        grid-cols-[repeat(auto-fill,minmax(220px,1fr))]
        sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]
        lg:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]
      "
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
