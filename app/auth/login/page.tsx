import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/src/features/auth/components/LoginForm";
import { FiUserPlus, FiKey } from "react-icons/fi";
import Heading from "@/src/components/ui/Heading";
import { generatePageTitle } from "@/src/utils/metadata";

export const metadata: Metadata = {
  title: generatePageTitle("Iniciar sesión"),
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-1 text-center">
        <Heading>Iniciar sesión</Heading>
        <p className="text-sm text-zinc-500">
          Ingresa tus credenciales para continuar
        </p>
      </div>
      <LoginForm />

      <nav className="mt-2 space-y-3">
        {/* REGISTER */}
        <Link
          href="/auth/create-account"
          className="
      flex items-center justify-center gap-2
      w-full rounded-lg border border-zinc-200
      py-3 text-sm font-medium text-zinc-800
      bg-white hover:bg-zinc-50
      transition
    "
        >
          <FiUserPlus size={16} />
          <span>¿No tienes cuenta? Crear cuenta</span>
        </Link>

        {/* FORGOT PASSWORD */}
        <Link
          href="/auth/forgot-password"
          className="
      flex items-center justify-center gap-2
      w-full rounded-lg
      py-2 text-sm text-zinc-500
      hover:text-zinc-800
      transition
    "
        >
          <FiKey size={15} />
          <span>¿Olvidaste tu contraseña?</span>
        </Link>
      </nav>
    </div>);
}
