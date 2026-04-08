import { prisma } from "@/src/lib/prisma";

class AuthRepository {
  async userExists(email: string) {
    return !!(await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    }));
  }
}

export const authRepository = new AuthRepository();