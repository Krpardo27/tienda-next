
import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "El correo es obligatorio" })
    .email("Correo no válido"),

  password: z
    .string()
    .trim()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres"),

  email: z
    .string()
    .trim()
    .min(1, "El correo es obligatorio")
    .email("Correo no válido"),

  password: z
    .string()
    .trim()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "El correo es obligatorio" })
    .email("Correo no válido"),
});