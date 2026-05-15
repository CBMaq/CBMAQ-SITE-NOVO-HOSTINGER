import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { db } from "@/lib/db";

const formSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  company: z.string().min(2, "Empresa é obrigatória"),
  equipmentType: z.string().min(1, "Selecione o tipo de equipamento"),
  message: z.string().optional(),
  country: z.string().min(2, "País/Região é obrigatória"),
  importCategory: z.string().min(1, "Selecione a modalidade"),
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
          type: "QUOTE_IMPORTACAO",
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
    
    // HTML Email Direto e Simplificado para Importação
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #053474; border-bottom: 2px solid #0A4EE4; padding-bottom: 10px;">Nova Solicitação de Importação</h2>
        
        <p><strong>Nome Completo:</strong> ${validatedData.fullName}</p>
        <p><strong>Empresa:</strong> ${(validatedData as any).company}</p>
        <p><strong>E-mail:</strong> ${(validatedData as any).email}</p>
        <p><strong>Telefone:</strong> ${(validatedData as any).phone}</p>
        
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        
        <p><strong>Tipo de Equipamento:</strong> ${validatedData.equipmentType}</p>
        <p><strong>País/Região de Origem:</strong> ${validatedData.country}</p>
        <p><strong>Modalidade de Importação:</strong> ${validatedData.importCategory}</p>
        
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        
        <p><strong>Mensagem Adicional:</strong></p>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 4px; font-style: italic;">
          ${(validatedData as any).message || "Sem mensagem adional fornecida."}
        </p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: `CBMaq Site <${fromEmail}>`,
      to: [toEmail],
      subject: `IMPORTAÇÃO / COTAÇÃO DE IMPORTAÇÃO: ${validatedData.fullName}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Error (Object):", error);
      return NextResponse.json({ 
        success: false, 
        message: `Resend: ${error.message}` 
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
