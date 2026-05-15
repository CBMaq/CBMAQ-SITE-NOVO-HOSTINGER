interface VendasAoGovernoEmailData {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  acquisitionType: string;
  equipment: string;
  message?: string;
}

export const getVendasAoGovernoEmailHtml = (data: VendasAoGovernoEmailData) => {
  const {
    fullName,
    email,
    phone,
    institution,
    acquisitionType,
    equipment,
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
          .container { max-width: 600px; margin: 0 auto; backgroundColor: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #E9ECEF; background-color: #fff; }
          .header { background-color: #0A2A5E; padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; }
          .header p { color: #ffffff; opacity: 0.8; margin: 8px 0 0; font-size: 14px; }
          .content { padding: 30px; }
          .lead-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          .lead-table tr { border-bottom: 1px solid #F1F3F5; }
          .lead-table td { padding: 12px 0; }
          .label { font-weight: bold; color: #0A2A5E; width: 40%; }
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
            <h1>Solicitação de Vendas ao Governo</h1>
            <p>Nova solicitação recebida via site</p>
          </div>
          <div class="content">
            <p style="font-size: 16px; margin-bottom: 25px;">
              Olá, equipe <strong>CBMaq</strong>,<br />
              Um novo contato foi recebido na página de Vendas ao Governo:
            </p>
            <table class="lead-table">
              <tr><td class="label">Nome Completo</td><td class="value">${fullName}</td></tr>
              <tr><td class="label">E-mail</td><td class="value">${email}</td></tr>
              <tr><td class="label">Telefone</td><td class="value">${phone}</td></tr>
              <tr><td class="label">Órgão/Instituição</td><td class="value">${institution}</td></tr>
              <tr><td class="label">Tipo de aquisição</td><td class="value">${acquisitionType}</td></tr>
              <tr><td class="label">Equipamento</td><td class="value">${equipment}</td></tr>
            </table>
            <div class="message-box">
              <h3 class="message-label">Mensagem:</h3>
              <p class="message-text">${message || "Nenhuma mensagem enviada."}</p>
            </div>
            <div class="cta-container">
              <a href="mailto:${email}" class="cta-button">Responder ao Contato</a>
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
