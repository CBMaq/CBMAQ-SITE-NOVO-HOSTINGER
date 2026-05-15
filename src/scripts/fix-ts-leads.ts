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

function fixTS(routeName: string) {
  const routePath = path.join(apiDir, routeName, 'route.ts');
  if (!fs.existsSync(routePath)) return;

  let content = fs.readFileSync(routePath, 'utf8');

  // Replace validatedData. with (validatedData as any). in the Lead block
  content = content.replace(/validatedData\.nome/g, '(validatedData as any).nome');
  content = content.replace(/validatedData\.name/g, '(validatedData as any).name');
  content = content.replace(/validatedData\.email/g, '(validatedData as any).email');
  content = content.replace(/validatedData\.telefone/g, '(validatedData as any).telefone');
  content = content.replace(/validatedData\.phone/g, '(validatedData as any).phone');
  content = content.replace(/validatedData\.empresa/g, '(validatedData as any).empresa');
  content = content.replace(/validatedData\.company/g, '(validatedData as any).company');
  content = content.replace(/validatedData\.mensagem/g, '(validatedData as any).mensagem');
  content = content.replace(/validatedData\.message/g, '(validatedData as any).message');
  
  // also add fullName support
  content = content.replace(/\(validatedData as any\)\.name \|\|/g, '(validatedData as any).name || (validatedData as any).fullName ||');

  fs.writeFileSync(routePath, content, 'utf8');
}

routesToUpdate.forEach(fixTS);
