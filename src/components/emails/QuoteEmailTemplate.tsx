interface QuoteEmailData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  cnpj?: string;
  equipmentType?: string;
  mainApplication?: string;
  purchaseTimeframe?: string;
  message?: string;
  // Smart Fields
  productName?: string;
  productBrand?: string;
  productCategory?: string;
  productUrl?: string;
  classification?: string;
}

export const getQuoteEmailHtml = (data: QuoteEmailData) => {
  const {
    fullName,
    email,
    phone,
    company,
    cnpj,
    equipmentType,
    mainApplication,
    purchaseTimeframe,
    message,
    productName,
    productBrand,
    productCategory,
    productUrl,
    classification,
  } = data;

  const year = new Date().getFullYear();

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: sans-serif; background-color: #F8F9FA; padding: 40px 20px; color: #343A40; line-height: 1.6; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; backgroundColor: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #E9ECEF; background-color: #fff; }
          .header { background-color: #0A2A5E; padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; }
          .header p { color: #ffffff; opacity: 0.8; margin: 8px 0 0; font-size: 14px; }
          .content { padding: 30px; }
          .section-title { font-size: 14px; font-weight: bold; color: #0A4EE4; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #F1F3F5; padding-bottom: 8px; margin: 25px 0 15px; }
          .lead-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .lead-table tr { border-bottom: 1px solid #F1F3F5; }
          .lead-table td { padding: 12px 0; }
          .label { font-weight: bold; color: #0A2A5E; width: 40%; font-size: 13px; }
          .value { color: #495057; font-size: 14px; }
          .product-card { background-color: #0A2A5E; border-radius: 8px; padding: 20px; color: #fff; margin-bottom: 20px; }
          .product-name { font-size: 18px; font-weight: bold; margin: 0; color: #fff; }
          .product-meta { font-size: 12px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 1px; margin-top: 5px; }
          .message-box { background-color: #F8F9FA; padding: 20px; border-radius: 8px; border-left: 4px solid #0A4EE4; }
          .message-label { margin: 0 0 10px; font-size: 14px; text-transform: uppercase; color: #6C757D; }
          .message-text { margin: 0; font-size: 15px; }
          .cta-container { text-align: center; margin-top: 35px; }
          .cta-button { display: inline-block; background-color: #0A4EE4; color: #ffffff !important; padding: 14px 30px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 16px; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #ADB5BD; background-color: #F8F9FA; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Solicitação de Proposta</h1>
            <p>Recebida via Catálogo Digital CBMaq</p>
          </div>
          <div class="content">
            
            ${productName ? `
              <div class="product-card">
                <p class="product-meta">${productCategory || "Equipamento"} — ${productBrand || "Lovol"}</p>
                <h2 class="product-name">${productName}</h2>
                ${classification ? `<p style="margin: 5px 0 0; font-size: 12px; color: #00D121;">Classificação: ${classification}</p>` : ""}
                ${productUrl ? `<a href="${productUrl}" style="color: #fff; font-size: 11px; text-decoration: underline; display: block; margin-top: 10px;">Ver no catálogo</a>` : ""}
              </div>
            ` : ""}

            <div class="section-title">Dados do Cliente</div>
            <table class="lead-table">
              <tr><td class="label">Nome Completo</td><td class="value">${fullName}</td></tr>
              <tr><td class="label">E-mail</td><td class="value">${email}</td></tr>
              <tr><td class="label">Telefone / WhatsApp</td><td class="value">${phone}</td></tr>
              <tr><td class="label">Empresa</td><td class="value">${company}</td></tr>
              ${cnpj ? `<tr><td class="label">CNPJ</td><td class="value">${cnpj}</td></tr>` : ""}
            </table>

            ${(!productName && equipmentType) ? `
              <div class="section-title">Interesse</div>
              <table class="lead-table">
                <tr><td class="label">Equipamento</td><td class="value">${equipmentType}</td></tr>
                <tr><td class="label">Aplicação</td><td class="value">${mainApplication}</td></tr>
                <tr><td class="label">Prazo Aquisição</td><td class="value">${purchaseTimeframe}</td></tr>
              </table>
            ` : ""}

            <div class="section-title">Mensagem</div>
            <div class="message-box">
              <p class="message-text">${message || "Nenhuma mensagem adicional enviada."}</p>
            </div>
            
            <div class="cta-container">
              <a href="mailto:${email}" class="cta-button">Responder ao Cliente</a>
            </div>
          </div>
          <div class="footer">
            © ${year} CBMaq Máquinas e Equipamentos. Todos os direitos reservados.
          </div>
        </div>
      </body>
    </html>
  `;
};
