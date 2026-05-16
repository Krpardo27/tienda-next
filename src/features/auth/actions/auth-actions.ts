"use server";

import { requireAuth } from "@/src/lib/auth-server";
import {
  ChangePasswordInput,
  ChangePasswordSchema,
  ForgotPasswordInput,
  ForgotPasswordSchema,
  SetPasswordInput,
  SetPasswordSchema,
  SignInInput,
  SignUpInput,
  SignUpSchema,
} from "../schemas/authSchema";
import { authService } from "../services/AuthService";
import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";

export async function signUpAction(input: SignUpInput) {
  const data = SignUpSchema.safeParse(input);

  if (!data.success) {
    return {
      error: "Error de validación",
      success: "",
    };
  }

  return authService.register(data.data);
}

export async function signInAction(input: SignInInput) {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email: input.email,
        password: input.password,
      },
      headers: await headers(),
    });

    return {
      success: true,
      data: {
        user: result?.user ?? null,
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error inesperado";

    return {
      success: false,
      error: message,
    };
  }
}

export async function forgotPasswordAction(input: ForgotPasswordInput) {
  const data = ForgotPasswordSchema.safeParse(input);

  if (!data.success) {
    return {
      error: "Error de validación",
      success: "",
    };
  }
  const response = await authService.requestPasswordReset(input);
  return response;
}

export async function setPasswordAction(
  input: SetPasswordInput,
  token: string,
) {
  const data = SetPasswordSchema.safeParse(input);

  if (!data.success) {
    return {
      error: "Error de validación",
      success: "",
    };
  }
  const response = await authService.confirmPasswordReset(input, token);
  return response;
}

export async function changePasswordAction(input: ChangePasswordInput) {
  const { session } = await requireAuth();
  const data = ChangePasswordSchema.safeParse(input);

  if (!session || !data.success) {
    return {
      error: "Hubo un error",
      success: "",
    };
  }

  const result = await authService.changePassword(data.data);
  return result;
}
