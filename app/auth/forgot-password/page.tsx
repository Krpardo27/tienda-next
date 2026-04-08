import { Metadata } from "next";
import Link from "next/link";
import ForgotPasswordForm from "@/src/features/auth/components/ForgotPasswordForm";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import Heading from "@/src/components/ui/Heading";

export const metadata: Metadata = {
  title:  "Recuperar contraseña",
};

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md mx-auto space-y-6">

      {/* HEADER */}
      <div className="space-y-1 text-center">
        <Heading className="text-zinc-500">Recupera tu contraseña</Heading>
        <p className="text-sm text-zinc-400">
          Ingresa tu correo electrónico para recibir instrucciones de recuperación
        </p>
      </div>
      <ForgotPasswordForm />

      <nav className="mt-2 space-y-3 w-full">
        {/* LOGIN */}
        <Link
          href="/auth/login"
          className="
      flex items-center justify-center gap-2
      w-full rounded-lg border border-zinc-200
      py-3 text-sm font-medium text-zinc-800
      bg-white hover:bg-zinc-50
      transition active:scale-[0.99]
    "
        >
          <FiLogIn size={16} />
          <span>Volver a iniciar sesión</span>
        </Link>

        {/* REGISTER */}
        <Link
          href="/auth/create-account"
          className="
      flex items-center justify-center gap-2
      w-full rounded-lg
      py-2 text-sm text-zinc-500
      hover:text-zinc-800
      transition
    "
        >
          <FiUserPlus size={15} />
          <span>¿No tienes cuenta? Crear cuenta</span>
        </Link>
      </nav>
    </div>
  );
}
