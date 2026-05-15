import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getAssistanceEmailHtml } from "@/components/emails/AssistanceEmailTemplate";
import { uploadImage } from "@/lib/supabase";
import { db } from "@/lib/db";

const assistanceSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  company: z.string().min(2, "Empresa é obrigatória"),
  maintenanceType: z.string().min(1, "Selecione o tipo de manutenção"),
  brand: z.string().min(1, "Selecione a marca"),
  urgency: z.string().min(1, "Selecione a urgência"),
  message: z.string().min(5, "Mensagem obrigatória"),
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const fullName = formData.get("fullName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const phone = formData.get("phone")?.toString() || "";
    const company = formData.get("company")?.toString() || "";
    const maintenanceType = formData.get("maintenanceType")?.toString() || "";
    const brand = formData.get("brand")?.toString() || "";
    const urgency = formData.get("urgency")?.toString() || "";
    const message = formData.get("message")?.toString() || "";
    const attachment = formData.get("attachment") as File | null;

    const validatedData = assistanceSchema.parse({
      fullName,
      email,
      phone,
      company,
      maintenanceType,
      brand,
      urgency,
      message,
    });

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.QUOTE_DESTINATION_EMAIL;
    const fromEmail = process.env.OUTBOUND_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.error("ERRO: Variáveis de ambiente faltando");
      return NextResponse.json({ 
        success: false, 
        message: "Configuração do servidor incompleta." 
      }, { status: 500 });
    }

    let attachmentUrl = null;
    const attachments = [];

    if (attachment) {
      try {
        // Upload para o bucket leads-attachments
        attachmentUrl = await uploadImage(attachment, "leads-attachments");

        // Prepara buffer para o e-mail
        const buffer = Buffer.from(await attachment.arrayBuffer());
        attachments.push({
          filename: attachment.name,
          content: buffer,
        });
      } catch (uploadError) {
        console.error("Erro no upload do anexo:", uploadError);
        // Continua mesmo se o upload falhar, mas loga o erro
      }
    }

    // Salva o lead no banco de dados
    try {
      await db.lead.create({
        data: {
          type: "ASSISTANCE",
          name: validatedData.fullName,
          email: validatedData.email,
          phone: validatedData.phone,
          company: validatedData.company,
          message: validatedData.message,
          data: {
            maintenanceType: validatedData.maintenanceType,
            brand: validatedData.brand,
            urgency: validatedData.urgency,
            attachmentUrl: attachmentUrl,
          },
          status: "PENDENTE",
        }
      });
    } catch (dbError) {
      console.error("Erro ao salvar Lead no banco:", dbError);
    }

    const resend = new Resend(apiKey);
    const emailHtml = getAssistanceEmailHtml(validatedData);

    const { data, error } = await resend.emails.send({
      from: `CBMaq Assistência <${fromEmail}>`,
      to: [toEmail],
      subject: `Solicitação de Assistência: ${validatedData.fullName} - ${validatedData.brand}`,
      html: emailHtml,
      attachments,
    });

    if (error) {
       return NextResponse.json({ 
        success: false, 
        message: `Resend Error: ${error.message}` 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Solicitação enviada com sucesso!" 
    });

  } catch (error: any) {
    console.error("API Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

