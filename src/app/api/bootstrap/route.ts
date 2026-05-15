import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function GET(request: Request) {
  // Pequena trava de segurança: use ?secret=cbmaq2024 na URL
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== "cbmaq2024") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const adminEmail = "villardiital.bkp@gmail.com";
    const hashedPassword = await bcrypt.hash("CBMaq2024!", 10);

    const user = await db.user.upsert({
      where: { email: adminEmail },
      update: {
        password: hashedPassword,
        role: "ADMIN",
        isActive: true,
      },
      create: {
        email: adminEmail,
        name: "Admin CBMaq",
        password: hashedPassword,
        role: "ADMIN",
        isActive: true,
      },
    });

    return NextResponse.json({
      message: "Gambiarra Profissional executada com sucesso!",
      user: {
        email: user.email,
        role: user.role,
        status: "PRONTO PARA LOGIN"
      }
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Falha na gambiarra", 
      details: error.message 
    }, { status: 500 });
  }
}
