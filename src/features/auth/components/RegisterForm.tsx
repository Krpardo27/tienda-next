"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Form, FormInput, FormLabel, FormSubmit } from "@/components/forms";
import { SignUpInput, SignUpSchema } from "../schemas/authSchema";
import FormErrors from "@/src/shared/components/forms/FormErrors";
import { signUpAction } from "../actions/auth-actions";
import { redirect } from "next/navigation";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    mode: "all",
  });

  const onSubmit = async (data: SignUpInput) => {
    const { error, success } = await signUpAction(data);

    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success(success);
      reset()
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="name">Nombre:</FormLabel>
      <FormInput
        type="text"
        id="name"
        placeholder="Ingresa tu nombre"
        {...register("name")}
      />
      {errors.name && <FormErrors>{errors.name.message}</FormErrors>}
      <FormLabel htmlFor="email">Email:</FormLabel>
      <FormInput
        type="email"
        id="email"
        placeholder="Ingresa tu email"
        {...register("email")}
      />
      {errors.email && <FormErrors>{errors.email.message}</FormErrors>}
      <FormLabel htmlFor="password">Contraseña:</FormLabel>
      <FormInput
        type="password"
        id="password"
        placeholder="Ingresa tu contraseña min 8 caracteres"
        {...register("password")}
      />
      {errors.password && <FormErrors>{errors.password.message}</FormErrors>}
      <FormLabel htmlFor="confirmPassword">Confirmar Contraseña:</FormLabel>
      <FormInput
        type="password"
        id="confirmPassword"
        placeholder="Repite tu contraseña"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <FormErrors>{errors.confirmPassword.message}</FormErrors>
      )}
      <FormSubmit type="submit" value="Crear cuenta" />
    </Form>
  );
}
