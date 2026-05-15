import { PrismaClient, Role } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'villardigital.bkp@gmail.com';
  const adminPassword = 'v@bhKC4c9&2XCei6';
  
  console.log('--- Iniciando Seed ---');
  
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true,
    },
    create: {
      email: adminEmail,
      name: 'Administrador CBMaq',
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true,
    },
  });
  
  console.log(`✅ Usuário administrador criado/atualizado: ${admin.email}`);
  console.log('--- Seed Concluído ---');
}

main()
  .catch((e) => {
    console.error('❌ Erro no Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
