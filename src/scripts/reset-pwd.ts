import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const email = 'villardiital.bkp@gmail.com';
    const newHash = '$2b$10$OM.0uT4H9BN7jwqD6J0JSeYmTARmFWOdZ6W5SaxUyZ5N9hPGypJB2'; // Cbmaq123
    
    await prisma.user.update({
      where: { email },
      data: { password: newHash }
    });
    
    console.log('--- SUCESSO ---');
    console.log('Senha de ' + email + ' resetada para: Cbmaq123');
  } catch (error) {
    console.error('ERRO:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
