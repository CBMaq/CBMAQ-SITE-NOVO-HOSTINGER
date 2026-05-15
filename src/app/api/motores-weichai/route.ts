import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getWeichaiEmailHtml } from "@/components/emails/WeichaiEmailTemplate";
import { db } from "@/lib/db";

const formSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  company: z.string().min(2, "Empresa é obrigatória"),
  applicationType: z.string().min(2, "Tipo de Aplicação é obrigatório"),
  powerRange: z.string().min(1, "Faixa de Potência é obrigatória"),
  need: z.string().min(2, "Necessidade é obrigatória"),
  message: z.string().optional().or(z.literal("")),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = formSchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.QUOTE_DESTINATION_EMAIL;
    const fromEmail = process.env.OUTBOUND_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error("ERRO: Variáveis de ambiente faltando no .env.local");
      return NextResponse.json({ 
        success: false, 
        message: "Configuração do servidor incompleta." 
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
          type: "MOTORES_WEICHAI",
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
    const emailHtml = getWeichaiEmailHtml(validatedData);

    const { data, error } = await resend.emails.send({
      from: `CBMaq Site <${fromEmail}>`,
      to: [toEmail],
      subject: `Motores Weichai / solicitação comercial / contato sobre motores (${validatedData.fullName})`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ 
        success: false, 
        message: "Erro no servidor de e-mail." 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Solicitação enviada com sucesso!" 
    });

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        success: false, 
        errors: error.issues 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: false, 
      message: "Erro interno: " + (error.message || "Erro desconhecido")
    }, { status: 500 });
  }
}
