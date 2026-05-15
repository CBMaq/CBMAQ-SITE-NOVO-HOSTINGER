export function getTrabalheConoscoEmailHtml(data: {
  nome: string;
  telefone: string;
  email: string;
  areaInteresse: string;
  sobre: string;
  curriculoUrl: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; max-w: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0A4EE4; padding: 20px; text-align: center;">
        <h2 style="color: #fff; margin: 0;">Novo Currículo Recebido</h2>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px; line-height: 1.5; color: #555;">
          Você recebeu um novo currículo através do portal Trabalhe Conosco CBMaq.
        </p>

        <h3 style="color: #0A4EE4; border-bottom: 2px solid #0A4EE4; padding-bottom: 5px;">Dados do Candidato</h3>
        <p><strong>Nome Completo:</strong> ${data.nome}</p>
        <p><strong>E-mail:</strong> ${data.email}</p>
        <p><strong>Telefone:</strong> ${data.telefone}</p>
        <p><strong>Área de Interesse:</strong> ${data.areaInteresse}</p>

        <h3 style="color: #0A4EE4; border-bottom: 2px solid #0A4EE4; padding-bottom: 5px;">Sobre o Candidato</h3>
        <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 10px; border-radius: 4px;">${data.sobre}</p>

        <h3 style="color: #0A4EE4; border-bottom: 2px solid #0A4EE4; padding-bottom: 5px;">Anexo</h3>
        ${
          data.curriculoUrl
            ? `<p><a href="${data.curriculoUrl}" target="_blank" style="display: inline-block; padding: 10px 15px; background-color: #0A4EE4; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold;">Baixar Currículo</a></p>`
            : `<p>Nenhum currículo anexado.</p>`
        }
      </div>
      <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #888;">
        Este e-mail foi gerado automaticamente pelo sistema do site CBMaq.
      </div>
    </div>
  `;
}
