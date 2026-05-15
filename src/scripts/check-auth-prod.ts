import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function check() {
  console.log("--- INICIANDO DIAGNÓSTICO DE PRODUÇÃO 2 ---");
  console.log("DATABASE_URL:", process.env.DATABASE_URL ? "CONFIGURADA" : "AUSENTE");

  try {
    const email = "villardiital.bkp@gmail.com";
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error("ERRO: Usuário não encontrado no banco de dados.");
      return;
    }

    console.log("USUÁRIO ENCONTRADO:", user.email);
    console.log("ROLE:", user.role);

    const passwordToTest = "v@bhKC4c9&2XCei6";
    const isMatch = await bcrypt.compare(passwordToTest, user.password || "");

    console.log("TESTE DE SENHA LOCAL (COM DADOS DO BANCO):", isMatch ? "SUCESSO" : "FALHA");

    if (!isMatch) {
      console.log("HASH NO BANCO:", user.password);
    }

  } catch (error) {
    console.error("ERRO CRÍTICO NA CONEXÃO:", error);
  } finally {
    await prisma.$disconnect();
  }
}

check();
