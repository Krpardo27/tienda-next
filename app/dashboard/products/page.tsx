import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import Heading from "@/src/shared/ui/Heading";
import ProductsPagination from "@/src/shared/components/products/ProductsPagination";
import ProductsClientView from "@/src/shared/components/products/ProductsClientView";

async function productCount() {
  return await prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  return await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  });
}

export type ProductWithCategory = Awaited<
  ReturnType<typeof getProducts>
>[number];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const pageSize = 10;

  if (page <= 0) redirect("/dashboard/products");

  const [products, totalProducts] = await Promise.all([
    getProducts(page, pageSize),
    productCount(),
  ]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (totalProducts > 0 && page > totalPages) {
    redirect("/dashboard/products");
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between mb-6 gap-4 max-w-7xl mx-auto space-y-4 px-4">
        <Heading>Administrar Productos</Heading>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Link
          href="/dashboard/products/new"
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>
      </div>

      <ProductsClientView initialProducts={products} />

      {totalProducts > 0 && (
        <ProductsPagination
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  );
}