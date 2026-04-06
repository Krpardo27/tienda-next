"use client";

import { logoutAction } from "@/app/auth/actions/logout-action";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();

    router.replace("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="
        flex items-center gap-3
        w-full px-4 py-3
        text-sm font-medium
        text-red-500
        hover:bg-red-50
        rounded-xl
        transition
      "
    >
      <FiLogOut size={18} />
      Cerrar sesión
    </button>
  );
}