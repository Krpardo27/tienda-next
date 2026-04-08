import Link from "next/link";
import RegisterForm from "@/src/features/auth/components/RegisterForm";
import { Metadata } from "next";
import { FiKey, FiLogIn } from "react-icons/fi";
import Heading from "@/src/components/ui/Heading";
import { generatePageTitle } from "@/src/utils/metadata";

export const metadata: Metadata = {
  title: generatePageTitle("Crear cuenta"),
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="space-y-1 text-center">
        <Heading>Regístrate</Heading>
        <p className="text-sm text-zinc-500">
          Crea una cuenta para continuar
        </p>
      </div>

      {/* FORM */}
      <RegisterForm />

      {/* NAV */}
      <nav className="mt-2 space-y-3">
        <Link
          href="/auth/login"
          className="
            flex items-center justify-center gap-2
            w-full rounded-lg border border-zinc-200
            py-3 text-sm font-medium text-zinc-800
            bg-white hover:bg-zinc-50
            transition
          "
        >
          <FiLogIn size={16} />
          <span>¿Ya tienes una cuenta? Iniciar sesión</span>
        </Link>

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
    </div>
  );
}