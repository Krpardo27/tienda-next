import AdminSidebar from "@/src/shared/components/admin/AdminSidebar";
import AdminMobileNav from "@/src/shared/ui/AdminMobileNav";
import HistoryNavigationGuard from "@/src/shared/ui/HistoryNavigationGuard";
import LogoutButton from "@/src/shared/ui/LogoutButton";
import { requireAuth } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth } = await requireAuth();

  if (!isAuth) {
    redirect("/auth/login");
  }

  return (
    <>
      <HistoryNavigationGuard />
      <div
        className="flex min-h-screen bg-zinc-50  text-zinc-900  transition-colors duration-300 "
      >
        {/* SIDEBAR */}
        <aside
          className="
            hidden md:flex md:flex-col
            md:w-72
            border-r
            border-[var(--border)]
            bg-[var(--surface)]
            
            
            md:sticky md:top-0 md:h-screen
          "
        >
          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto">
            <AdminSidebar />
          </div>

          {/* FOOTER */}
          <div
            className="
              p-4¿
              border-t
              border-[var(--border)]
            "
          >
            <LogoutButton />
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 flex flex-col min-w-0">
          <section
            className="
              flex-1
              overflow-y-auto
              bg-zinc-50
              p-5
              transition-colors duration-300
            "
          >
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          </section>
        </main>

        {/* MOBILE NAV */}
        <AdminMobileNav />
      </div>
    </>
  );
}
