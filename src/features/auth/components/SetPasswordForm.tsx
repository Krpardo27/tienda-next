"use client";

import {
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
} from "@/shared/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SetPasswordInput, SetPasswordSchema } from "../schemas/authSchema";
import FormErrors from "@/src/shared/components/forms/FormErrors";
import { redirect, useSearchParams } from "next/navigation";
import { setPasswordAction } from "../actions/auth-actions";
import { toast } from "react-toastify";

export default function SetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  // console.log("Token:", token);
  if (!token) redirect("/auth/forgot-password");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SetPasswordSchema),
    mode: "all",
  });

  const onSubmit = async (data: SetPasswordInput) => {
    console.log("Form data:", data);
    const { error, success } = await setPasswordAction(data, token);
    if (error) {
      toast.error(error);
      return;
    }
    if (success) {
      toast.success(success);
      redirect("/auth/login");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="newsPassword">Nueva contraseña:</FormLabel>
      <FormInput
        id="newsPassword"
        type="password"
        placeholder="Ingresa tu nueva contraseña"
        {...register("newPassword")}
      />
      {errors.newPassword && (
        <FormErrors>{errors.newPassword.message}</FormErrors>
      )}

      <FormLabel htmlFor="confirmPassword">Confirmar contraseña:</FormLabel>
      <FormInput
        id="confirmPassword"
        type="password"
        placeholder="Confirma tu nueva contraseña"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <FormErrors>{errors.confirmPassword.message}</FormErrors>
      )}
      <FormSubmit value="Restablecer contraseña" />
    </Form>
  );
}
