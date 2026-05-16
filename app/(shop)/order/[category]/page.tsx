import ProductCard from "@/src/shared/components/products/ProductCard";
import Heading from "@/src/shared/ui/Heading";
import AutoRefresh from "@/src/shared/ui/AutoRefresh";
import { prisma } from "@/src/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ search?: string }>;
};

export default async function OrderPage({
  params,
  searchParams,
}: Props) {
  const { category } = await params;
  const { search = "" } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
      name: {
        contains: search,
        mode: "insensitive",
      },
      available: true,
    },
  });

  return (
    <main className="min-h-screen bg-(--background)">
      <AutoRefresh intervalMs={15000} />

      <section
        className="
          border-b border-(--border)
          bg-white
        "
      >
        <div
          className="
            mx-auto max-w-7xl
            px-4 sm:px-6 lg:px-8
            py-12 sm:py-16
          "
        >
          <div className="max-w-3xl">
            <span
              className="
                inline-flex items-center
                rounded-full
                bg-amber-500/10
                px-4 py-1.5
                text-xs font-semibold
                uppercase tracking-[0.2em]
                text-amber-600
              "
            >
              Menu digital
            </span>

            <Heading
              level={1}
              className="
                mt-5
                text-4xl sm:text-5xl lg:text-6xl
                font-black
                tracking-tight
                text-(--foreground)
              "
            >
              Fuente Vicuna
            </Heading>

            <p
              className="
                mt-5
                max-w-2xl
                text-base sm:text-lg
                leading-relaxed
                text-zinc-500
              "
            >
              Descubre preparaciones artesanales, hamburguesas premium, carnes,
              tablas y especialidades inspiradas en la cocina chilena.
            </p>
          </div>
        </div>
      </section>

      <section
        className="
          mx-auto max-w-7xl
          px-4 sm:px-6 lg:px-8
          py-10 sm:py-14
        "
      >
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2
              className="
                text-2xl sm:text-3xl
                font-bold
                tracking-tight
                text-(--foreground)
              "
            >
              Nuestro menu
            </h2>

            <p className="mt-2 text-sm sm:text-base text-zinc-500">
              {products.length} productos disponibles
            </p>
          </div>
        </div>

        <div
          className="
            grid gap-6 sm:gap-7
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            2xl:grid-cols-4
          "
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}