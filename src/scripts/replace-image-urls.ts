import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mappingPath = path.join(process.cwd(), 'src', 'scripts', 'image-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Sort mappings by length descending to avoid partial replacements (e.g. /images/logo vs /images/logo-cbmaq)
const sortedKeys = Object.keys(mapping).sort((a, b) => b.length - a.length);

function walk(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (file !== 'scripts' && file !== 'node_modules' && file !== '.next') {
        walk(fullPath);
      }
    } else if (/\.(tsx|ts|css)$/i.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      for (const localPath of sortedKeys) {
        // Use a global replacement for the specific string
        // We match exactly the local path as it appears in the code (usually in quotes)
        const regex = new RegExp(localPath, 'g');
        if (content.includes(localPath)) {
          content = content.replace(regex, mapping[localPath]);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`✅ Atualizado: ${path.relative(process.cwd(), fullPath)}`);
      }
    }
  }
}

console.log('Iniciando substituição global de URLs de imagem...');
walk(path.join(process.cwd(), 'src'));
console.log('Substituição concluída!');
