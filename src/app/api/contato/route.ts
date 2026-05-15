import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { db } from "@/lib/db";

const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  empresa: z.string().optional(),
  assunto: z.string().min(1, "Assunto é obrigatório"),
  mensagem: z.string().min(5, "Mensagem muito curta"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;
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
          type: "CONTATO",
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
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #053474; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: white; margin: 0;">Novo Contato Pelo Site</h2>
        </div>
        <div style="padding: 24px; background-color: #F8F9FA; border: 1px solid #E0E4EA; border-top: none; border-radius: 0 0 8px 8px;">
          <p><strong>Nome:</strong> ${(validatedData as any).nome}</p>
          <p><strong>E-mail:</strong> ${(validatedData as any).email}</p>
          <p><strong>Telefone:</strong> ${(validatedData as any).telefone}</p>
          ${(validatedData as any).empresa ? `<p><strong>Empresa:</strong> ${(validatedData as any).empresa}</p>` : ""}
          <p><strong>Assunto:</strong> ${validatedData.assunto}</p>
          <hr style="border: none; border-top: 1px solid #E0E4EA; margin: 20px 0;" />
          <p><strong>Mensagem:</strong></p>
          <p style="white-space: pre-wrap; background: white; padding: 16px; border-radius: 4px; border: 1px solid #E0E4EA;">${(validatedData as any).mensagem}</p>
        </div>
      </div>
    `;

    const subject = `Novo contato pelo site: ${validatedData.assunto}`;

    const { error } = await resend.emails.send({
      from: `CBMaq Site <${fromEmail}>`,
      to: [toEmail],
      replyTo: (validatedData as any).email,
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
      message: "Mensagem enviada com sucesso!",
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
