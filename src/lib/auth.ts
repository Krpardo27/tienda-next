import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { AuthEmailService } from "../emails/services/AuthEmailService";

function getAuthSecret() {
  const secret = process.env.BETTER_AUTH_SECRET?.trim();

  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV === "test") {
    return "test-secret-only";
  }

  throw new Error(
    "Falta BETTER_AUTH_SECRET. Define una clave segura en variables de entorno antes de iniciar la app.",
  );
}

export const auth = betterAuth({
  secret: getAuthSecret(),
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    
    sendResetPassword: async ({ user, url }) => {
      const { name, email } = user;
      await AuthEmailService.sendPasswordResetEmail({
        email,
        name,
        url,
      });
    },
  },
  emailVerification: {
    sendOnSignIn: false,
    autoSignInAfterVerification: false,

    sendVerificationEmail: async ({ user, url }) => {
      const { name, email } = user;

      await AuthEmailService.sendVerificationEmail({
        name,
        email,
        url,
      });
    },
  },
  plugins: [nextCookies()],
});
