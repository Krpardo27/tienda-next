import { prisma } from "@/src/lib/prisma";
import ImageUpload from "../products/ImageUpload";
import { Category, Product } from "@/src/generated/prisma/client";

type ProductWithCategory = Product & {
  category: Category;
};

type ProductFormProps = {
  product?: ProductWithCategory;
};

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function ProductForm({ product }: ProductFormProps) {
  const categories = await getCategories();

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 " htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Nombre Producto"
          defaultValue={product?.name}
          className="
            block w-full px-4 py-3
            rounded-xl border border-zinc-200 
            bg-white 
            text-sm text-zinc-900  placeholder:text-zinc-400 
            shadow-xs
            focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition
          "
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 " htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          name="price"
          type="number"
          placeholder="Precio Producto"
          defaultValue={product?.price?.toString() || ""}
          className="
            block w-full px-4 py-3
            rounded-xl border border-zinc-200 
            bg-white 
            text-sm text-zinc-900  placeholder:text-zinc-400 
            shadow-xs
            focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition
          "
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-zinc-700 "
          htmlFor="categoryId"
        >
          Categoría:
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId.toString()}
          className="
            block w-full px-4 py-3
            rounded-xl border border-zinc-200 
            bg-white 
            text-sm text-zinc-900 
            shadow-xs
            focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition
          "
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-zinc-700 "
          htmlFor="description"
        >
          Descripción:
        </label>

        <textarea
          id="description"
          name="description"
          placeholder="Descripción del producto"
          rows={4}
          defaultValue={product?.description || ""}
          className="
      block w-full px-4 py-3
      rounded-xl border border-zinc-200 
      bg-white 
      text-sm text-zinc-900  placeholder:text-zinc-400 
      shadow-xs
      focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
      transition
      resize-none
    "
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="isPopular"
          name="isPopular"
          type="checkbox"
          defaultChecked={product?.isPopular}
          className="
      size-4 rounded
      border-zinc-300
      text-amber-500
      focus:ring-amber-500
    "
        />

        <label
          htmlFor="isPopular"
          className="text-sm text-zinc-700 dark:text-zinc-300"
        >
          Marcar como popular
        </label>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="available"
          name="available"
          type="checkbox"
          defaultChecked={product?.available ?? true}
          className="size-4 rounded border-zinc-300"
        />

        <label
          htmlFor="available"
          className="text-sm text-zinc-700 dark:text-zinc-300"
        >
          Producto disponible
        </label>
      </div>

      <ImageUpload
        image={product?.image}
        categorySlug={product?.category?.slug}
      />
    </>
  );
}
