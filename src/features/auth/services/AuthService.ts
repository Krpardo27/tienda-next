import { auth } from "@/src/lib/auth";
import {
  ChangePasswordInput,
  ForgotPasswordInput,
  SetPasswordInput,
  SignInInput,
  SignUpInput,
} from "../schemas/authSchema";
import { headers } from "next/headers";
import { APIError } from "better-auth";

class AuthService {
  async register({ name, email, password }: SignUpInput) {
    try {
      await auth.api.signUpEmail({
        body: { name, email, password, callbackURL: "/auth/login" },
      });

      return {
        success: "Cuenta creada correctamente. Revisa tu email para verificarla.",
        error: "",
      };
    } catch (error) {
      if (error instanceof APIError) {
        return {
          error: "No se pudo crear la cuenta. Verifica tus datos o intenta con otro email.",
          success: "",
        };
      }

      return {
        error: error instanceof Error ? error.message : "Error inesperado",
        success: "",
      };
    }
  }

  async login({ email, password }: SignInInput) {
    try {
      await auth.api.signInEmail({
        body: {
          email,
          password,
          callbackURL: "/dashboard",
        },
        headers: await headers(),
      });

      return { success: "Sesión iniciada correctamente", error: "" };
    } catch (error) {
      if (error instanceof APIError) {
        const messages: Record<number, string> = {
          401: "Credenciales inválidas",
          403: "Email no verificado",
        };

        return {
          error: messages[error.statusCode] || "Error al iniciar sesión",
          success: "",
        };
      }

      return {
        error: "Error inesperado",
        success: "",
      };
    }
  }

  async requestPasswordReset(input: ForgotPasswordInput) {
    try {
      const { email } = input;

      await auth.api.requestPasswordReset({
        body: { email },
        headers: await headers(),
      });

      return {
        error: "",
        success:
          "Si tu correo es válido, recibirás instrucciones para continuar",
      };
    } catch {
      return {
        error: "Ocurrió un error al procesar la solicitud.",
        success: "",
      };
    }
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
          "Contraseña restablecida correctamente. Ya puedes iniciar sesión.",
      };
    } catch (error) {
      const errorMessage =
        error instanceof APIError
          ? "El enlace es inválido o ha expirado."
          : "Error inesperado.";

      return {
        error: errorMessage,
        success: "",
      };
    }
  }

  async changePassword(input: ChangePasswordInput) {
    const { newPassword, currentPassword } = input;
    try {
      await auth.api.changePassword({
        body: {
          currentPassword,
          newPassword,
        },
        headers: await headers(),
      });

      return {
        error: "",
        success: "La contraseña se actualizó correctamente",
      };
    } catch (error) {
      if (error instanceof APIError) {
        const messages: Record<number, string> = {
          401: "La contraseña actual es incorrecta",
          403: "No autorizado para cambiar la contraseña",
        };

        return {
          error: messages[error.statusCode] || "No se pudo actualizar la contraseña",
          success: "",
        };
      }

      return {
        error: "Ocurrió un error inesperado al cambiar la contraseña",
        success: "",
      };
    }
  }

  async getSessions() {
    return auth.api.listSessions({
      headers: await headers(),
    });
  }
}

export const authService = new AuthService();
