import fs from 'fs';
import path from 'path';

const apiDir = path.join(__dirname, '../app/api');
const routesToUpdate = [
  'consultoria',
  'contato',
  'motores-weichai',
  'ouvidoria',
  'pecas-multimarcas',
  'quote',
  'quote-importacao',
  'seguros',
  'seja-revendedor',
  'telemetria',
  'vendas-ao-governo'
];

function updateRoute(routeName: string) {
  const routePath = path.join(apiDir, routeName, 'route.ts');
  if (!fs.existsSync(routePath)) {
    console.log(`Skipping ${routeName}, file not found.`);
    return;
  }

  let content = fs.readFileSync(routePath, 'utf8');

  // Já foi atualizado?
  if (content.includes('db.lead.create')) {
    console.log(`Skipping ${routeName}, already updated.`);
    return;
  }

  // Adicionar import
  if (!content.includes('import { db }')) {
    // Find the last import
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    content = content.slice(0, endOfLastImport) + '\nimport { db } from "@/lib/db";' + content.slice(endOfLastImport);
  }

  const typeName = routeName.toUpperCase().replace(/-/g, '_');

  const leadCreateBlock = `
    try {
      // Extrair campos base
      const name = validatedData.nome || validatedData.name || "N/A";
      const email = validatedData.email || "N/A";
      const phone = validatedData.telefone || validatedData.phone || "";
      const company = validatedData.empresa || validatedData.company || "";
      const message = validatedData.mensagem || validatedData.message || "";
      
      // Remover campos base do JSON extra
      const { nome, name: _n, email: _e, telefone, phone: _p, empresa, company: _c, mensagem, message: _m, ...extraData } = validatedData as any;

      await db.lead.create({
        data: {
          type: "${typeName}",
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
  `;

  // Inject before const resend = new Resend(apiKey);
  const injectionPoint = 'const resend = new Resend(';
  if (content.includes(injectionPoint)) {
    content = content.replace(injectionPoint, leadCreateBlock + '\n    ' + injectionPoint);
    fs.writeFileSync(routePath, content, 'utf8');
    console.log(`Updated ${routeName}.`);
  } else {
    console.log(`Injection point not found in ${routeName}`);
  }
}

routesToUpdate.forEach(updateRoute);
