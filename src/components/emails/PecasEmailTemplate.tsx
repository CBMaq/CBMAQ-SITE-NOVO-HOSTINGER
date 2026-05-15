interface SolicitacaoEmail {
  marcaMaquina: string;
  modeloMaquina: string;
  tipoPeca: string;
  descricaoPeca: string;
  fotosUrls: string[];
  documentosUrls: string[];
}

interface PecasEmailData {
  empresa: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: string;
  cidadeEstado: string;
  nomeResponsavel: string;
  solicitacoes: SolicitacaoEmail[];
}

export const getPecasEmailHtml = (data: PecasEmailData) => {
  const year = new Date().getFullYear();
  const totalItems = data.solicitacoes.length;

  const solicitacoesHtml = data.solicitacoes
    .map(
      (sol, idx) => `
      <div style="background-color: #F8F9FA; border-radius: 12px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #0A4EE4;">
        <h3 style="margin: 0 0 14px; font-size: 16px; color: #0A2A5E; font-weight: bold;">
          Solicitação #${idx + 1}
        </h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #E9ECEF;">
            <td style="padding: 8px 0; font-weight: bold; color: #0A2A5E; width: 40%; font-size: 14px;">Marca da Máquina</td>
            <td style="padding: 8px 0; color: #495057; font-size: 14px;">${sol.marcaMaquina}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E9ECEF;">
            <td style="padding: 8px 0; font-weight: bold; color: #0A2A5E; width: 40%; font-size: 14px;">Modelo da Máquina</td>
            <td style="padding: 8px 0; color: #495057; font-size: 14px;">${sol.modeloMaquina}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E9ECEF;">
            <td style="padding: 8px 0; font-weight: bold; color: #0A2A5E; width: 40%; font-size: 14px;">Tipo de Peça</td>
            <td style="padding: 8px 0; color: #495057; font-size: 14px;">${sol.tipoPeca}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E9ECEF;">
            <td style="padding: 8px 0; font-weight: bold; color: #0A2A5E; width: 40%; font-size: 14px;">Descrição</td>
            <td style="padding: 8px 0; color: #495057; font-size: 14px;">${sol.descricaoPeca}</td>
          </tr>
          ${
            sol.fotosUrls.length > 0
              ? `<tr style="border-bottom: 1px solid #E9ECEF;">
                  <td style="padding: 8px 0; font-weight: bold; color: #0A2A5E; width: 40%; font-size: 14px;">📷 Fotos (${sol.fotosUrls.length})</td>
                  <td style="padding: 8px 0; color: #495057; font-size: 14px;">
                    ${sol.fotosUrls.map((url, i) => `<a href="${url}" style="color: #0A4EE4; text-decoration: underline; margin-right: 10px;">Foto ${i + 1}</a>`).join("")}
                  </td>
                </tr>`
              : ""
          }
          ${
            sol.documentosUrls.length > 0
              ? `<tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #0A2A5E; width: 40%; font-size: 14px;">📎 Documentos (${sol.documentosUrls.length})</td>
                  <td style="padding: 8px 0; color: #495057; font-size: 14px;">
                    ${sol.documentosUrls.map((url, i) => `<a href="${url}" style="color: #0A4EE4; text-decoration: underline; margin-right: 10px;">Doc ${i + 1}</a>`).join("")}
                  </td>
                </tr>`
              : ""
          }
        </table>
      </div>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: sans-serif; background-color: #F8F9FA; padding: 40px 20px; color: #343A40; line-height: 1.6; margin: 0; }
          .container { max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #E9ECEF; }
          .header { background-color: #0A2A5E; padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: bold; }
          .header p { color: #ffffff; opacity: 0.8; margin: 8px 0 0; font-size: 14px; }
          .badge { display: inline-block; background-color: #0A4EE4; color: #ffffff; padding: 4px 14px; border-radius: 50px; font-size: 13px; font-weight: bold; margin-top: 10px; }
          .content { padding: 30px; }
          .section-title { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #6C757D; font-weight: bold; margin: 0 0 12px; padding-bottom: 8px; border-bottom: 2px solid #E9ECEF; }
          .lead-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          .lead-table tr { border-bottom: 1px solid #F1F3F5; }
          .lead-table td { padding: 10px 0; font-size: 14px; }
          .label { font-weight: bold; color: #0A2A5E; width: 40%; }
          .value { color: #495057; }
          .cta-container { text-align: center; margin-top: 30px; }
          .cta-button { display: inline-block; background-color: #0A4EE4; color: #ffffff !important; padding: 14px 30px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 15px; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #ADB5BD; background-color: #F8F9FA; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nova Solicitação de Peças Multimarcas</h1>
            <p>Pedido recebido via formulário do site CBMaq</p>
            <span class="badge">${totalItems} item(ns) solicitado(s)</span>
          </div>
          <div class="content">
            <p class="section-title">Dados da Empresa</p>
            <table class="lead-table">
              <tr><td class="label">Empresa</td><td class="value">${data.empresa}</td></tr>
              <tr><td class="label">CNPJ</td><td class="value">${data.cnpj}</td></tr>
              <tr><td class="label">E-mail</td><td class="value">${data.email}</td></tr>
              <tr><td class="label">Telefone</td><td class="value">${data.telefone}</td></tr>
              <tr><td class="label">Endereço</td><td class="value">${data.endereco}</td></tr>
              <tr><td class="label">Cidade/Estado</td><td class="value">${data.cidadeEstado}</td></tr>
              <tr><td class="label">Responsável</td><td class="value">${data.nomeResponsavel}</td></tr>
            </table>

            <p class="section-title">Solicitações de Peças</p>
            ${solicitacoesHtml}

            <div class="cta-container">
              <a href="mailto:${data.email}" class="cta-button">Responder ao Contato</a>
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
