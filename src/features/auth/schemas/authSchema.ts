import z from "zod";

export const BaseAuthSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre es demasiado largo" })
    .regex(/^[a-zA-ZáéíóúñÑ\s]+$/, {
      message: "Solo letras y espacios",
    }),
  email: z.email({ message: "El email no es válido" }).toLowerCase().trim(),
  password: z
    .string()
    .trim()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  confirmPassword: z
    .string()
    .trim()
    .min(1, { message: "El password de confirmación no puede ir vacío" }),
  newPassword: z
    .string()
    .trim()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
});

export const SignUpSchema = BaseAuthSchema.pick({
  name: true,
  email: true,
  password: true,
  confirmPassword: true,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const SignInSchema = BaseAuthSchema.pick({
  email: true,
}).extend({
  password: z
    .string()
    .trim()
    .min(1, { message: "La contraseña no puede ir vacía" }),
});

export const ForgotPasswordSchema = BaseAuthSchema.pick({
  email: true,
});

export const SetPasswordSchema = BaseAuthSchema.pick({
  newPassword: true,
  confirmPassword: true,
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type SetPasswordInput = z.infer<typeof SetPasswordSchema>;


