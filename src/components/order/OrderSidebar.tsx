import { prisma } from "@/src/lib/prisma"
import CategoryIcon from "../ui/CategoryIcon"
import Logo from "../ui/Logo"
import OrderSummaryMobile from "./OrderSummaryMobile"

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" }, // 🔥 opcional pero pro
  })
}

export default async function OrderSidebar() {
  const categories = await getCategories()

  return (
    <aside className="md:w-72 hidden md:h-screen bg-white border-r border-zinc-200 lg:flex flex-col">
      {/* 🔥 LOGO (intacto) */}
      <div className="p-3 md:p-6 w-28 lg:w-full border-b border-zinc-200 flex items-center justify-center">
        <Logo />
      </div>

      {/* 📱 MOBILE STICKY CATEGORIES */}
      <div className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b">
        <div className="flex gap-3 overflow-x-auto px-3 py-3 [&>*]:shrink-0">
          {categories.map((category) => (
            <CategoryIcon key={category.id} category={category} />
          ))}
        </div>
      </div>

      <div className="md:hidden">
        <OrderSummaryMobile />
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