import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getOuvidoriaEmailHtml } from "@/components/emails/OuvidoriaEmailTemplate";
import { db } from "@/lib/db";

const formSchema = z.object({
  tipo: z.string().min(1, "Tipo é obrigatório"),
  anonimo: z.boolean(),
  nome: z.string(),
  telefone: z.string(),
  email: z.string(),
  assunto: z.string().min(1, "Assunto é obrigatório"),
  mensagem: z.string().min(5, "Mensagem muito curta"),
  anexosUrls: z.array(z.string()).default([]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;
    // Ouvidoria usually goes to a specific HR or board email, but we'll use standard for now
    const toEmail = process.env.QUOTE_DESTINATION_EMAIL; 
    const fromEmail = process.env.OUTBOUND_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error("ERRO: Variáveis de ambiente faltando no .env");
      return NextResponse.json({
        success: false,
        message: "Configuração do servidor incompleta.",
      }, { status: 500 });
    }

    
    try {
      // Extrair campos base
      const name = (validatedData as any).nome || (validatedData as any).name || (validatedData as any).fullName || "N/A";
      const email = (validatedData as any).email || "N/A";
      const phone = (validatedData as any).telefone || (validatedData as any).phone || "";
      const company = (validatedData as any).empresa || (validatedData as any).company || "";
      const message = (validatedData as any).mensagem || (validatedData as any).message || "";
      
      // Remover campos base do JSON extra
      const { nome, name: _n, email: _e, telefone, phone: _p, empresa, company: _c, mensagem, message: _m, ...extraData } = validatedData as any;

      await db.lead.create({
        data: {
          type: "OUVIDORIA",
          name: name,
          email: email,
          phone: phone,
          company: company,
          message: message,
          data: extraData,
          status: "PENDENTE",
        }
      });
    } catch (dbError) {
      console.error("Erro ao salvar Lead no banco:", dbError);
    }
  
    const resend = new Resend(apiKey);
    const emailHtml = getOuvidoriaEmailHtml(validatedData);

    const anonStatus = validatedData.anonimo ? "Anônima" : "Identificada";
    const subject = `Ouvidoria [${validatedData.tipo}] - Manifestação ${anonStatus}`;

    const { error } = await resend.emails.send({
      from: `CBMaq Ouvidoria <${fromEmail}>`,
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
      message: "Manifestação enviada com sucesso!",
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
