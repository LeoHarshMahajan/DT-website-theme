import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash('DTAdmin@2026!', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@digitaltriangle.in' },
    update: {},
    create: {
      email: 'admin@digitaltriangle.in',
      name: 'Digital Triangle Admin',
      password: passwordHash,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  console.log(`✓ Admin user ready: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
