import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { AuthEmailService } from "../emails/services/AuthEmailService";

export const auth = betterAuth({
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
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const { name, email } = user;
      await AuthEmailService.sendVerificationEmail({ name, email, url });
    },
  },
  plugins: [nextCookies()],
});
