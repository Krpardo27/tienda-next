import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function seedAdmin() {
  try {
    const email = "admin@test.com";
    const password = await bcrypt.hash("123456", 10);

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password,
        role: "ADMIN",
      },
    });

    console.log("✅ Admin creado correctamente");
  } catch (error) {
    console.error("❌ Error creando admin:", error);
  }
}

seedAdmin()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });