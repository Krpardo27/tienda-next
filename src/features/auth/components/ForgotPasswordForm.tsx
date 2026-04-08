"use client";

import { Form, FormLabel, FormInput, FormSubmit } from "@/components/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordInput,
  ForgotPasswordSchema,
} from "../schemas/authSchema";
import FormErrors from "@/src/shared/components/forms/FormErrors";
import { forgotPasswordAction } from "../actions/auth-actions";
import { toast } from "react-toastify";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "all",
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    const { error, success } = await forgotPasswordAction(data);

    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel>Email:</FormLabel>
      <FormInput
        type="email"
        id="email"
        placeholder="Ingresa tu email"
        {...register("email")}
      />
      {errors.email && <FormErrors>{errors.email.message}</FormErrors>}
      <FormSubmit value="Enviar instrucciones" />
    </Form>
  );
}
