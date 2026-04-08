
import ProductSearchForm from "@/src/components/products/ProductSearchForm";
import ProductTable from "@/src/components/products/ProductTable";
import Heading from "@/src/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive"
      },
    },
    include: {
      category: true,
    },
  });
  return products;
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {
  // console.log(searchParams.search);
  const products = await searchProducts(searchParams.search);

  return (
    <>
      <Heading>Resultados de búsqueda: {searchParams.search}</Heading>
      <div className="flex flex-col lg:flex-row items-center justify-end mb-6 gap-4">
        <ProductSearchForm />
      </div>


      {products.length > 0 ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-gray-500 text-lg">No se encontraron productos.</p>
      )}
    </>
  )
}
