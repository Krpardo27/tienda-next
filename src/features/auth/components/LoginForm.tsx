"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Link from "next/link";
import { LoginSchema } from "@/src/schema/auth";
import { Form, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms";
import FormErrors from "@/src/shared/components/forms/FormErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
      {pending ? "Ingresando..." : "Ingresar"}
    </button>
  );
}

export default function LoginForm({ action }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    mode: "all",
  });

  const onSubmit = async (data: SignInInput) => {
    console.log(data);
    // const { success, error } = await signInAction(data);
    // if (error) {
    //   toast.error(error);
    // }

    // if (success) {
    //   toast.success(success);
    //   // redirect("/admin")
    // }
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