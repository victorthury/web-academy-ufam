import { PrismaClient } from '@prisma/client';
import { UserTypes } from '../src/resources/userTypes/userTypes.constants';

const prisma = new PrismaClient();

async function seed() {
  return await prisma.userType.createMany({
    data: [
      { id: UserTypes.admin, label: 'admin' },
      { id: UserTypes.client, label: 'client' },
    ],
    skipDuplicates: true,
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
