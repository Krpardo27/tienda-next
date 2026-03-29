import { notFound } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

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
      <Heading>Elige y personaliza tu pedido a continuación</Heading>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 items-start my-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
