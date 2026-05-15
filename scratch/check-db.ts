import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
  const categories = await prisma.catalogCategory.findMany({
    select: { name: true, coverImage: true, slug: true }
  });
  console.log(JSON.stringify(categories, null, 2));
}

check()
  .finally(async () => {
    await prisma.$disconnect();
  });
