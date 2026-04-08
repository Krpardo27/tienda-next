import AdminSidebar from "@/src/components/admin/AdminSidebar";
import AdminMobileNav from "@/src/components/ui/AdminMobileNav";
import LogoutButton from "@/src/components/ui/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <aside
          className="
  hidden md:flex md:flex-col
  md:w-72
  bg-white border-r border-gray-200
  md:sticky md:top-0 md:h-screen
"
        >
          {/* SCROLLABLE */}
          <div className="flex-1 overflow-y-auto">
            <AdminSidebar />
          </div>

          {/* FIXED BOTTOM */}
          <div className="p-4 border-t border-gray-200">
            <LogoutButton />
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col">
          {/* Topbar sutil (no rompe nada) */}
          <div
            className="
            h-14
            bg-white/80 backdrop-blur-sm
            border-b border-gray-200
            flex items-center
            px-6
          "
          >
            <span className="text-sm font-medium text-gray-600">
              Panel de administración
            </span>
          </div>

          {/* Content */}
          <div
            className="
            md:flex-1 md:h-screen md:overflow-y-scroll bg-gray-100 p-5
          "
          >
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          </div>
        </main>

        <AdminMobileNav />
      </div>
    </>
  );
}
