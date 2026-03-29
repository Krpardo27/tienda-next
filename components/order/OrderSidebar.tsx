import { prisma } from "@/src/lib/prisma"
import CategoryIcon from "../ui/CategoryIcon"
import Logo from "../ui/Logo"

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" }, // 🔥 opcional pero pro
  })
}

export default async function OrderSidebar() {
  const categories = await getCategories()

  return (
    <aside className="md:w-72 md:h-screen bg-white border-r border-zinc-200 flex flex-col">

      {/* 🔥 LOGO (intacto) */}
      <div className="p-4 md:p-6 border-b border-zinc-200">
        <Logo />
      </div>

      {/* 📱 MOBILE → scroll horizontal */}
      <div
        className="
          flex gap-3 overflow-x-auto px-3 py-3
          md:hidden
          [&>*]:shrink-0
        "
      >
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </div>

      {/* 💻 DESKTOP → sidebar original */}
      <nav
        className="
          hidden md:flex flex-col
          flex-1
          mt-6 md:mt-8
          px-2 md:px-4
          space-y-1 md:space-y-2
          uppercase
        "
      >
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>

      {/* 🔥 FOOTER opcional (no rompe nada) */}
      <div className="hidden md:block p-4 border-t border-zinc-200 text-xs text-zinc-400">
        © 2026 Tu App
      </div>
    </aside>
  )
}