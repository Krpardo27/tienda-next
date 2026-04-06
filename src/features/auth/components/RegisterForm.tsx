"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Link from "next/link";
import { RegisterSchema } from "@/src/schema/auth";

type RegisterState = {
  success?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    general?: string[];
  };
};

type Props = {
  action: (prevState: RegisterState, formData: FormData) => Promise<RegisterState>;
};

const initialState: RegisterState = {
  success: false,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white
      transition hover:bg-zinc-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Creando cuenta..." : "Crear cuenta"}
    </button>
  );
}

export default function RegisterForm({ action }: Props) {
  const router = useRouter();
  const [state, formAction] = useActionState(action, initialState);
  const [clientErrors, setClientErrors] = useState<RegisterState["errors"]>({});

  useEffect(() => {
    if (!state) return;

    const serverErrors = state.errors ?? {};
    const messages = Object.values(serverErrors).flat().filter(Boolean);

    if (messages.length) {
      messages.forEach((msg) => toast.error(msg));
    }

    if (state.success) {
      toast.success("Cuenta creada 🎉");
      router.replace("/admin/login");
    }
  }, [state, router]);

  const mergedErrors = useMemo(
    () => ({
      name: clientErrors?.name ?? state?.errors?.name,
      email: clientErrors?.email ?? state?.errors?.email,
      password: clientErrors?.password ?? state?.errors?.password,
      general: state?.errors?.general,
    }),
    [clientErrors, state]
  );

  const validateClient = (formData: FormData) => {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = RegisterSchema.safeParse(rawData);

    if (!result.success) {
      const fieldErrors: {
        name?: string[];
        email?: string[];
        password?: string[];
      } = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof typeof fieldErrors;

        if (!field) continue;

        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }

        fieldErrors[field]!.push(issue.message);
      }

      setClientErrors(fieldErrors);

      Object.values(fieldErrors)
        .flat()
        .filter(Boolean)
        .forEach((msg) => toast.error(msg));

      return false;
    }

    setClientErrors({});
    return true;
  };

  return (
    <div className="min-h-screen bg-zinc-100 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)]">

          {/* HEADER (igual que login) */}
          <div className="border-b border-zinc-100 bg-gradient-to-b from-zinc-50 to-white px-8 py-8">
            <div className="space-y-2 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-sm">
                R
              </div>

              <h1 className="text-3xl font-black tracking-tight text-zinc-900">
                Crear cuenta
              </h1>

              <p className="text-sm text-zinc-500">
                Registro para administración
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="px-8 py-8">
            <form
              action={async (formData) => {
                const isValid = validateClient(formData);
                if (!isValid) return;
                await formAction(formData);
              }}
              className="space-y-5"
            >
              {/* NAME */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700">
                  Nombre
                </label>

                <input
                  name="name"
                  className={`w-full rounded-xl border px-4 py-3 text-sm ${mergedErrors.name
                    ? "border-red-400 bg-red-50"
                    : "border-zinc-300"
                    }`}
                />

                {mergedErrors.name?.[0] && (
                  <p className="text-xs text-red-600">
                    {mergedErrors.name[0]}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700">
                  Correo
                </label>

                <input
                  name="email"
                  type="email"
                  className={`w-full rounded-xl border px-4 py-3 text-sm ${mergedErrors.email
                    ? "border-red-400 bg-red-50"
                    : "border-zinc-300"
                    }`}
                />

                {mergedErrors.email?.[0] && (
                  <p className="text-xs text-red-600">
                    {mergedErrors.email[0]}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-700">
                  Contraseña
                </label>

                <input
                  name="password"
                  type="password"
                  className={`w-full rounded-xl border px-4 py-3 text-sm ${mergedErrors.password
                    ? "border-red-400 bg-red-50"
                    : "border-zinc-300"
                    }`}
                />

                {mergedErrors.password?.[0] && (
                  <p className="text-xs text-red-600">
                    {mergedErrors.password[0]}
                  </p>
                )}
              </div>

              {/* GENERAL ERROR */}
              {mergedErrors.general?.[0] && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {mergedErrors.general[0]}
                </div>
              )}

              <SubmitButton />

              {/* LINK */}
              <p className="text-center text-sm text-zinc-500">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="font-semibold text-black">
                  Inicia sesión
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}