interface SegurosEmailData {
  nomeCompleto: string;
  email: string;
  telefone: string;
  tipoEquipamento: string;
  anoFabricacao: string;
  valorAproximado: string;
  tipoCotacao: string;
  mensagem?: string;
}

export const getSegurosEmailHtml = (data: SegurosEmailData) => {
  const {
    nomeCompleto,
    email,
    telefone,
    tipoEquipamento,
    anoFabricacao,
    valorAproximado,
    tipoCotacao,
    mensagem,
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
            <h1>Solicitação de Seguro para Equipamentos</h1>
            <p>Novo lead qualificado via site CBMaq</p>
          </div>
          <div class="content">
            <p style="font-size: 16px; margin-bottom: 25px;">
              Olá, equipe <strong>CBMaq Seguros</strong>,<br />
              Um novo cliente solicitou cotação de seguro:
            </p>
            <table class="lead-table">
              <tr><td class="label">Nome Completo</td><td class="value">${nomeCompleto}</td></tr>
              <tr><td class="label">E-mail</td><td class="value">${email}</td></tr>
              <tr><td class="label">Telefone</td><td class="value">${telefone}</td></tr>
              <tr><td class="label">Tipo de Equipamento</td><td class="value">${tipoEquipamento}</td></tr>
              <tr><td class="label">Ano de Fabricação</td><td class="value">${anoFabricacao}</td></tr>
              <tr><td class="label">Valor Aproximado</td><td class="value">${valorAproximado}</td></tr>
              <tr><td class="label">Tipo de Cotação</td><td class="value">${tipoCotacao}</td></tr>
            </table>
            <div class="message-box">
              <h3 class="message-label">Mensagem:</h3>
              <p class="message-text">${mensagem || "Nenhuma mensagem adicional enviada."}</p>
            </div>
            <div class="cta-container">
              <a href="mailto:${email}" class="cta-button">Entrar em contato</a>
            </div>
          </div>
          <div class="footer">
            © ${year} CBMaq Máquinas e Equipamentos. Unidade de Seguros.
          </div>
        </div>
      </body>
    </html>
  `;
};
