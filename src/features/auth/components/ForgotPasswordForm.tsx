"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPasswordSchema } from "@/src/schema/auth";
import { motion } from "framer-motion";
import Link from "next/link";
import { LoginSchema } from "@/src/schema/auth";
import Heading from "../../../components/ui/Heading";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { Form, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms";
import FormErrors from "@/src/shared/components/forms/FormErrors";

type LoginState = {
  success?: boolean;
  errors?: {
    email?: string[];
    password?: string[];
    general?: string[];
  };
};

type Props = {
  action: (prevState: LoginState, formData: FormData) => Promise<LoginState>;
};

const initialState: LoginState = {
  success: false,
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white
        transition hover:bg-zinc-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60
      "
    >
      Restablecer contraseña
    </button>
  );
}

export default function ForgotPasswordForm({ action }: Props) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "all",
  });

  const router = useRouter();
  const [state, formAction] = useActionState(action, initialState);
  const [clientErrors, setClientErrors] = useState<LoginState["errors"]>({});

  useEffect(() => {
    if (!state) return;

    const serverErrors = state.errors ?? {};
    const messages = Object.values(serverErrors).flat().filter(Boolean);

    if (messages.length) {
      messages.forEach((msg) => toast.error(msg));
    }

    if (state.success) {
      toast.success("Bienvenido 👋");

      router.replace("/admin/orders");
      router.refresh();
    }
  }, [state, router]);

  const mergedErrors = useMemo(
    () => ({
      email: clientErrors?.email ?? state?.errors?.email,
      password: clientErrors?.password ?? state?.errors?.password,
      general: state?.errors?.general,
    }),
    [clientErrors, state]
  );

  const validateClient = (formData: FormData) => {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = LoginSchema.safeParse(rawData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="email">Email</FormLabel>
      <FormInput
        type="email"
        id="email"
        placeholder="Ingresa tu Email"
        {...register("email")}
      />
      {errors.email && <FormErrors>{errors.email.message}</FormErrors>}
      <FormLabel htmlFor="password">Contraseña</FormLabel>
      <FormInput
        type="password"
        id="password"
        placeholder="Ingresa tu contraseña"
        {...register("password")}
      />
      {errors.password && <FormErrors>{errors.password.message}</FormErrors>}
      <FormSubmit value="Iniciar Sesión" />
    </Form>
  );
}