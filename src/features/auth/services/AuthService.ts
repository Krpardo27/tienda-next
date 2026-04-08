import { auth } from "@/src/lib/auth";
import {
  ForgotPasswordInput,
  SetPasswordInput,
  SignInInput,
  SignUpInput,
} from "../schemas/authSchema";
import { authRepository } from "./AuthRepository";
import { headers } from "next/headers";
import { APIError } from "better-auth";

class AuthService {
  async register(credentials: SignUpInput) {
    const { name, email, password } = credentials;

    // validar existencia (opcional pero recomendable)
    const user = await authRepository.userExists(email);

    if (user) {
      return { error: "El email ya está registrado", success: "" };
    }

    // usar better-auth
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: "/dashboard/orders",
      },
    });

    return {
      error: "",
      success: "Cuenta creada correctamente",
    };
  }

  async login(credentials: SignInInput) {
    const { email } = credentials;

    // validar existencia
    const user = await authRepository.userExists(email);

    if (!user) {
      return { error: "El Usuario no está registrado", success: "" };
    }

    try {
      await auth.api.signInEmail({
        body: {
          email: credentials.email,
          password: credentials.password,
          callbackURL: "/dashboard/orders",
        },
        headers: await headers(),
      });

      return { error: "", success: "Sesión iniciada correctamente" };
    } catch (error) {
      if (error instanceof APIError) {
        // console.error(error.message);
        // console.error(error.statusCode);

        const messages: Record<number, string> = {
          401: "Password incorrecto",
          403: "Email no verificado. ¡Revisa tu bandeja de entrada!",
        };

        const errorMessage =
          messages[error.statusCode] || "Error al iniciar sesión";

        if (errorMessage) {
          return {
            error: errorMessage,
            success: "",
          };
        }
      }
    }

    return {
      error: "",
      success: "",
    };
  }

  async requestPasswordReset(input: ForgotPasswordInput) {
    const user = await authRepository.userExists(input.email);

    if (!user) {
      return { error: "El Usuario no existe", success: "" };
    }

    const { email } = input;
    await auth.api.requestPasswordReset({
      body: {
        email,
      },
      headers: await headers(),
    });

    return {
      error: "",
      success:
        "Se han enviado las instrucciones para reestablecer tu contraseña a tu email",
    };
  }

  async confirmPasswordReset(input: SetPasswordInput, token: string) {
    const { newPassword } = input;

    try {
      await auth.api.resetPassword({
        body: {
          newPassword,
          token,
        },
      });
      return {
        error: "",
        success:
          "Contraseña restablecida correctamente. Ya puedes iniciar sesión con tu nueva contraseña.",
      };
    } catch (error) {
      if (error instanceof APIError) {
        return {
          error:
            "Error al restablecer contraseña. El token es inválido o ha expirado.",
          success: "",
        };
      }
    }
    return {
      error: "",
      success: "",
    };
  }
}

export const authService = new AuthService();
