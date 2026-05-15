import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
  const count = await prisma.catalogProduct.count();
  console.log("Total products:", count);
}

check()
  .finally(async () => {
    await prisma.$disconnect();
  });
