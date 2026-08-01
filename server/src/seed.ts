import bcrypt from "bcrypt";
import prisma from "./db";

const users = [
  { name: "student", password: "student", role: "STUDENT" },
  { name: "admin", password: "admin", role: "ADMIN" },
  { name: "teacher", password: "teacher", role: "TEACHER" },
] as const;

async function seed() {
  for (const user of users) {
    const existing = await prisma.user.findFirst({
      where: { name: user.name },
    });

    if (!existing) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await prisma.user.create({
        data: {
          name: user.name,
          password: hashedPassword,
          role: user.role,
        },
      });
      console.log(`[seed] created user: ${user.name} (${user.role})`);
    } else {
      console.log(`[seed] user already exists, skipping: ${user.name}`);
    }
  }
}

seed()
  .catch((e) => {
    console.error("[seed] error:", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
