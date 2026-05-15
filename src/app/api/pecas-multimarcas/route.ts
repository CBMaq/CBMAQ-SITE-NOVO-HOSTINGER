import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getPecasEmailHtml } from "@/components/emails/PecasEmailTemplate";
import { db } from "@/lib/db";

const solicitacaoSchema = z.object({
  marcaMaquina: z.string().min(1, "Marca da máquina é obrigatória"),
  modeloMaquina: z.string().min(1, "Modelo da máquina é obrigatório"),
  tipoPeca: z.string().min(1, "Tipo de peça é obrigatório"),
  descricaoPeca: z.string().min(1, "Descrição da peça é obrigatória"),
  fotosUrls: z.array(z.string()).default([]),
  documentosUrls: z.array(z.string()).default([]),
});

const formSchema = z.object({
  empresa: z.string().min(2, "Empresa é obrigatória"),
  cnpj: z.string().min(11, "CNPJ inválido"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  endereco: z.string().min(3, "Endereço é obrigatório"),
  cidadeEstado: z.string().min(2, "Cidade/Estado é obrigatório"),
  nomeResponsavel: z.string().min(3, "Nome do responsável é obrigatório"),
  solicitacoes: z.array(solicitacaoSchema).min(1, "Pelo menos 1 solicitação é necessária"),
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
          type: "PECAS_MULTIMARCAS",
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
    const emailHtml = getPecasEmailHtml(validatedData);

    const totalItems = validatedData.solicitacoes.length;
    const subject = `Nova Solicitação de Peças - ${(validatedData as any).empresa} - ${totalItems} item(ns)`;

    const { error } = await resend.emails.send({
      from: `CBMaq Peças <${fromEmail}>`,
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
      message: "Solicitação enviada com sucesso!",
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
