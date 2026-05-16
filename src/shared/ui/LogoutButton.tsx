'use client';

import { signOut } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        try {
          setIsPending(true);
          await signOut();
          router.push("/auth/login");
          router.refresh();
        } finally {
          setIsPending(false);
        }
      }}
      disabled={isPending}
      className="
        flex items-center gap-3
        w-full px-4 py-3
        text-sm font-medium
        text-red-500
        hover:bg-red-50
        
        disabled:bg-gray-100 disabled:text-gray-400
         
        rounded-xl
        transition 
        cursor-pointer
        disabled:cursor-not-allowed
        active:scale-[0.98]
      "
    >
      <FiLogOut size={18} />
      {isPending ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  );
}