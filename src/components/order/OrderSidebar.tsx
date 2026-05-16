import { prisma } from "@/src/lib/prisma"
import CategoryIcon from "../../shared/ui/CategoryIcon"
import Logo from "../../shared/ui/Logo"

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  })
}

export default async function OrderSidebar() {
  const categories = await getCategories()

  return (
    <aside className="md:w-80 hidden md:h-screen border-r border-[var(--border)] lg:flex flex-col overflow-hidden bg-[var(--surface)]">
      <div className="p-3 md:p-6 w-28 lg:w-full border-b border-[var(--border)] flex items-center justify-center shrink-0">
        <Logo />
      </div>

      <nav className="hidden md:flex flex-col flex-1 min-h-0 overflow-y-auto mt-4 md:mt-2 px-2 md:px-4 space-y-1 md:space-y-2 uppercase">
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>

      <div className="hidden md:block p-4 border-t border-[var(--border)] text-xs text-zinc-400  shrink-0">
        © 2026 Fuente Vicuña
      </div>
    </aside>
  )
}