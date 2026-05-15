import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getTrabalheConoscoEmailHtml } from "@/components/emails/TrabalheConoscoEmailTemplate";
import { db } from "@/lib/db";

const formSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  telefone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("E-mail inválido"),
  areaInteresse: z.string().min(2, "Área de interesse é obrigatória"),
  sobre: z.string().min(5, "Sobre você é obrigatório"),
  curriculoUrl: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    // Save to database
    const prisma = db as any;
    await prisma.jobApplication.create({
      data: {
        nome: validatedData.nome,
        email: validatedData.email,
        telefone: validatedData.telefone,
        areaInteresse: validatedData.areaInteresse,
        sobre: validatedData.sobre,
        curriculoUrl: validatedData.curriculoUrl,
      }
    });

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.QUOTE_DESTINATION_EMAIL; // reusing standard dest email or configure a specific one
    const fromEmail = process.env.OUTBOUND_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error("ERRO: Variáveis de ambiente faltando no .env");
      return NextResponse.json({
        success: false,
        message: "Configuração do servidor incompleta.",
      }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const emailHtml = getTrabalheConoscoEmailHtml(validatedData);

    const subject = `Novo currículo recebido - Trabalhe Conosco`;

    const { error } = await resend.emails.send({
      from: `CBMaq Trabalhe Conosco <${fromEmail}>`,
      to: [toEmail],
      subject,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({
        success: false,
        message: "Erro no servidor de e-mail.",
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Currículo enviado com sucesso!",
    });

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        errors: error.issues,
      }, { status: 400 });
    }

    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({
      success: false,
      message: "Erro interno: " + msg,
    }, { status: 500 });
  }
}
