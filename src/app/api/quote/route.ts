import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getQuoteEmailHtml } from "@/components/emails/QuoteEmailTemplate";
import { db } from "@/lib/db";

const quoteSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  company: z.string().min(2, "Empresa é obrigatória"),
  cnpj: z.string().optional(),
  equipmentType: z.string().optional(),
  mainApplication: z.string().optional(),
  purchaseTimeframe: z.string().optional(),
  message: z.string().optional(),
  // Smart Fields
  productName: z.string().optional(),
  productBrand: z.string().optional(),
  productCategory: z.string().optional(),
  productUrl: z.string().optional(),
  classification: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = quoteSchema.parse(body);

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.QUOTE_DESTINATION_EMAIL;
    const fromEmail = process.env.OUTBOUND_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error("ERRO: Variáveis de ambiente faltando no .env.local");
      return NextResponse.json({ 
        success: false, 
        message: "Configuração do servidor incompleta (.env.local não carregado)." 
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
          type: "QUOTE",
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
    const emailHtml = getQuoteEmailHtml(validatedData);

    const { data, error } = await resend.emails.send({
      from: `CBMaq Site <${fromEmail}>`,
      to: [toEmail],
      subject: `Novo Lead: ${validatedData.fullName} - ${validatedData.productName || validatedData.equipmentType || "Interesse Geral"}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Error (Object):", error);
      return NextResponse.json({ 
        success: false, 
        message: `Resend: ${error.message}` 
      }, { status: 500 });
    }

    console.log("Email Sent Successfully:", data?.id);

    return NextResponse.json({ 
      success: true, 
      message: "Solicitação enviada com sucesso!" 
    });

  } catch (error: any) {
    console.error("Quote Form Full Error:", error);
    
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
