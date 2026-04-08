import Heading from "@/src/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <Heading>Producto no encontrado</Heading>
      <Link
        href="/dashboard/products"
        className="bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointerw-full lg:w-auto"
      >
        Volver a la lista de productos
      </Link>
    </div>
  );
}
