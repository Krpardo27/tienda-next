"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormInput, FormLabel, FormSubmit } from "@/components/forms";
import { SignInInput, SignInSchema } from "../schemas/authSchema";
import FormErrors from "@/src/shared/components/forms/FormErrors";
import { signInAction } from "../actions/auth-actions";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
    mode: "all",
  });

  const onSubmit = async (data: SignInInput) => {
    const { success, error } = await signInAction(data);

    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success(success);
      redirect("/dashboard");
    }
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
