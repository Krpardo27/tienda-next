import { prisma } from "@/src/lib/prisma";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function ProductForm() {

  const categories = await getCategories();
  console.log(categories);

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700" htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Nombre Producto"
          className="
            block w-full px-4 py-3
            rounded-xl border border-zinc-200
            bg-white
            text-sm text-zinc-900 placeholder:text-zinc-400
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition
          "
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          name="price"
          type="number"
          placeholder="Precio Producto"
          className="
            block w-full px-4 py-3
            rounded-xl border border-zinc-200
            bg-white
            text-sm text-zinc-900 placeholder:text-zinc-400
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition
          "
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-zinc-700"
          htmlFor="categoryId"
        >
          Categoría:
        </label>
        <select
          id="categoryId"
          name="categoryId"
          
          className="
            block w-full px-4 py-3
            rounded-xl border border-zinc-200
            bg-white
            text-sm text-zinc-900
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition
          "
        >
          <option value="">-- Seleccione --</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
