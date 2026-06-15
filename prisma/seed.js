const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@digitaltriangle.in' },
    update: {},
    create: {
      email: 'admin@digitaltriangle.in',
      name: 'Digital Triangle Admin',
      // DTAdmin@2026! — bcrypt hash (rounds=12)
      password: '$2a$12$nncvwlq2YIlLKSzIoBjgL.Ui5NSZ49sJuXQyGrMEMxklns2TFOWAa',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  console.log(`Admin user ready: ${admin.email}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
