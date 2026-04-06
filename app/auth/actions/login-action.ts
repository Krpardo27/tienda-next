"use server";

import { cookies } from "next/headers";
import { SignJWT } from "jose";
import bcrypt from "bcrypt";
import { prisma } from "@/src/lib/prisma";
import { LoginSchema } from "@/src/schema/auth";

export async function loginAction(
  _: any,
  formData: FormData,
): Promise<{
  success?: boolean;
  errors?: {
    email?: string[];
    password?: string[];
    general?: string[];
  };
}> {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = LoginSchema.safeParse(rawData);

    if (!result.success) {
      //  Zod moderno (sin flatten)
      const fieldErrors: Record<string, string[]> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;

        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }

        fieldErrors[field].push(issue.message);
      }

      return {
        errors: {
          email: fieldErrors.email,
          password: fieldErrors.password,
        },
      };
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    const fakeHash =
      "$2b$10$CwTycUXWue0Thq9StjUM0uJ8e0Zy8kQpVh3x8Z8Z8Z8Z8Z8Z8Z8Z8";

    const passwordToCompare = user?.password || fakeHash;

    const isValid = await bcrypt.compare(password, passwordToCompare);

    if (!user || !isValid) {
      return {
        errors: {
          general: ["Credenciales inválidas"],
        },
      };
    }

    if (user.role !== "ADMIN") {
      return {
        errors: {
          general: ["No autorizado"],
        },
      };
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT({
      userId: user.id,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    // ✅ FIX CRÍTICO
    const cookieStore = await cookies();

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true };
  } catch (error) {
    console.error(error);

    return {
      errors: {
        general: ["Error en el servidor"],
      },
    };
  }
}
