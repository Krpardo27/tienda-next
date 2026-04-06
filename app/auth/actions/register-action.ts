"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/src/lib/prisma";
import { RegisterSchema } from "@/src/schema/auth";

type RegisterState = {
  success?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    general?: string[];
  };
};

export async function registerAction(
  _: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // ✅ Validación Zod
    const result = RegisterSchema.safeParse(rawData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      return {
        errors: {
          name: fieldErrors.name,
          email: fieldErrors.email,
          password: fieldErrors.password,
        },
      };
    }

    const { name, email, password } = result.data;

    // 🔍 Verificar si ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return {
        errors: {
          email: ["Este correo ya está registrado"],
        },
      };
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Crear usuario
    await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "ADMIN", // ⚠️ ojo: esto en producción no debería ser libre
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);

    return {
      errors: {
        general: ["Error al registrar usuario"],
      },
    };
  }
}
