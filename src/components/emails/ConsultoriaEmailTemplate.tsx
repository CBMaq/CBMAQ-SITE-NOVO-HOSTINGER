interface ConsultoriaEmailData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  area: string;
  maquinarios: string;
  message?: string;
}

export const getConsultoriaEmailHtml = (data: ConsultoriaEmailData) => {
  const {
    fullName,
    email,
    phone,
    company,
    area,
    maquinarios,
    message,
  } = data;

  const year = new Date().getFullYear();

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: sans-serif; background-color: #F8F9FA; padding: 40px 20px; color: #343A40; line-height: 1.6; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #E9ECEF; }
          .header { background-color: #053474; padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; }
          .header p { color: #ffffff; opacity: 0.8; margin: 8px 0 0; font-size: 14px; }
          .content { padding: 30px; }
          .lead-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          .lead-table tr { border-bottom: 1px solid #F1F3F5; }
          .lead-table td { padding: 12px 0; }
          .label { font-weight: bold; color: #053474; width: 40%; }
          .value { color: #495057; }
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
            <h1>Interesse em Consultoria Especializada</h1>
            <p>Novo lead qualificado via site CBMaq</p>
          </div>
          <div class="content">
            <p style="font-size: 16px; margin-bottom: 25px;">
              Olá, equipe <strong>CBMaq Consultoria</strong>,<br />
              Um novo cliente solicitou um diagnóstico operacional:
            </p>
            <table class="lead-table">
              <tr><td class="label">Nome Completo</td><td class="value">${fullName}</td></tr>
              <tr><td class="label">E-mail</td><td class="value">${email}</td></tr>
              <tr><td class="label">Telefone</td><td class="value">${phone}</td></tr>
              <tr><td class="label">Empresa</td><td class="value">${company}</td></tr>
              <tr><td class="label">Área de Atuação</td><td class="value">${area}</td></tr>
              <tr><td class="label">Maquinários</td><td class="value">${maquinarios}</td></tr>
            </table>
            <div class="message-box">
              <h3 class="message-label">Mensagem Especial:</h3>
              <p class="message-text">${message || "Nenhuma mensagem adicional enviada."}</p>
            </div>
            <div class="cta-container">
              <a href="mailto:${email}" class="cta-button">Entrar em contato</a>
            </div>
          </div>
          <div class="footer">
            © ${year} CBMaq Máquinas e Equipamentos. Unidade de Inteligência de Negócios.
          </div>
        </div>
      </body>
    </html>
  `;
};
