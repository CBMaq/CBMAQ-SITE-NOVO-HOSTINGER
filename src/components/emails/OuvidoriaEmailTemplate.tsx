export function getOuvidoriaEmailHtml(data: {
  tipo: string;
  anonimo: boolean;
  nome: string;
  telefone: string;
  email: string;
  assunto: string;
  mensagem: string;
  anexosUrls: string[];
}) {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; max-w: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0A4EE4; padding: 20px; text-align: center;">
        <h2 style="color: #fff; margin: 0;">Nova Manifestação - Ouvidoria</h2>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px; line-height: 1.5; color: #555;">
          Você recebeu uma nova manifestação através do portal de Ouvidoria da CBMaq.
        </p>

        <h3 style="color: #0A4EE4; border-bottom: 2px solid #0A4EE4; padding-bottom: 5px;">Detalhes do Contato</h3>
        <p><strong>Tipo:</strong> ${data.tipo}</p>
        <p><strong>Modo:</strong> ${data.anonimo ? "Anônimo" : "Identificado"}</p>
        ${!data.anonimo ? `
          <p><strong>Nome:</strong> ${data.nome}</p>
          <p><strong>E-mail:</strong> ${data.email || "Não informado"}</p>
          <p><strong>Telefone:</strong> ${data.telefone || "Não informado"}</p>
        ` : ""}

        <h3 style="color: #0A4EE4; border-bottom: 2px solid #0A4EE4; padding-bottom: 5px; margin-top: 20px;">Mensagem</h3>
        <p><strong>Assunto:</strong> ${data.assunto}</p>
        <div style="white-space: pre-wrap; background-color: #f9f9f9; padding: 10px; border-radius: 4px; border: 1px solid #eee;">${data.mensagem}</div>

        <h3 style="color: #0A4EE4; border-bottom: 2px solid #0A4EE4; padding-bottom: 5px; margin-top: 20px;">Anexos</h3>
        ${
          data.anexosUrls && data.anexosUrls.length > 0
            ? data.anexosUrls.map((url, index) => `<p><a href="${url}" target="_blank" style="display: inline-block; padding: 8px 12px; background-color: #0A4EE4; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px;">Baixar Anexo ${index + 1}</a></p>`).join('')
            : `<p>Nenhum anexo.</p>`
        }
      </div>
      <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #888;">
        Este e-mail é gerado automaticamente pelo sistema de Ouvidoria da CBMaq.<br/>
        Trate estas informações com sigilo profissional.
      </div>
    </div>
  `;
}
