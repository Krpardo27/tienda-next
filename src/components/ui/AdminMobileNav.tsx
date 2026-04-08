"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiShoppingBag, FiBox, FiMonitor } from "react-icons/fi";

const adminNavigation = [
  { url: "/dashboard/orders", text: "Órdenes", icon: FiShoppingBag },
  { url: "/dashboard/products", text: "Productos", icon: FiBox },
  { url: "/order/cafe", text: "Quiosco", icon: FiMonitor, blank: true },
];

export default function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <div
      className="
      md:hidden
      fixed bottom-0 left-0 right-0 z-50
      bg-white border-t border-gray-200
      flex justify-around items-center
      h-16
    "
    >
      {adminNavigation.map((link) => {
        const isActive = pathname.startsWith(link.url);
        const Icon = link.icon;

        return (
          <Link
            key={link.url}
            href={link.url}
            target={link.blank ? "_blank" : "_self"}
            className={`
              flex flex-col items-center justify-center
              text-xs
              transition
              ${isActive ? "text-black scale-105" : "text-gray-400"}
            `}
          >
            <Icon size={20} />
            <span className="mt-1">{link.text}</span>
          </Link>
        );
      })}
    </div>
  );
}
