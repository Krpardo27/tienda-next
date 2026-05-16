import Logo from "../../ui/Logo";
import AdminRoute from "./AdminRoute";

const adminNavigation = [
  { url: "/dashboard/products", text: "Productos", blank: false },
  { url: "/", text: "Tienda", blank: true },
];

export default function AdminSidebar() {
  return (
    <div className="flex h-full flex-col">
      {/* LOGO */}
      <div
        className="px-6 py-6 border-b border-[var(--border)]">
        <Logo />
      </div>

      {/* NAV */}
      <div className="flex-1 px-3 py-6">
        <nav className="flex flex-col gap-1.5">
          {adminNavigation.map((link) => (
            <AdminRoute key={link.url} link={link} />
          ))}
        </nav>
      </div>

      {/* FOOTER */}
      <div
        className="
          px-6 py-4
          border-t border-[var(--border)]
          text-xs text-[var(--muted)]
        "
      >
        Panel administrativo
      </div>
    </div>
  );
}
