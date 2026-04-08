import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import Heading from "@/src/components/ui/Heading";
import ProductSearchForm from "@/src/components/products/ProductSearchForm";
import ProductTable from "@/src/components/products/ProductTable";
import ProductsPagination from "@/src/components/products/ProductsPagination";

async function productCount() {
  const count = await prisma.product.count();
  return count;
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    take: pageSize,
    skip: skip,
    include: {
      category: true,
    },
  });

  return products;
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

  if (page <= 0) redirect(`/dashboard/products`);

  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount();

  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page > totalPages) redirect(`/dashboard/products`);

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between mb-6 gap-4 max-w-7xl mx-auto space-y-4 px-4 py-8">
        <Heading>Administrar Productos</Heading>
      </div>
      <div className="flex justify-between items-center">
        <Link
          href={"/dashboard/products/new"}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      <ProductTable products={products} />
      <ProductsPagination page={page} totalPages={totalPages} />
    </>
  );
}
