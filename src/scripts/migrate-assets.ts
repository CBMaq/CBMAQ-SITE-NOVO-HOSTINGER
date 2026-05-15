import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

function sanitizeFileName(name: string): string {
  const lastDot = name.lastIndexOf('.');
  const nameWithoutExt = lastDot !== -1 ? name.substring(0, lastDot) : name;
  const ext = lastDot !== -1 ? name.split('.').pop() : '';
  
  const sanitized = nameWithoutExt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
    
  return ext ? `${sanitized}.${ext}` : sanitized;
}

async function uploadFile(filePath: string, bucketName: string = 'service_images'): Promise<string | null> {
  const fileName = path.basename(filePath);
  const sanitizedName = sanitizeFileName(fileName);
  const fileBuffer = fs.readFileSync(filePath);
  
  let finalName = sanitizedName;
  let attempts = 0;
  let success = false;

  while (!success && attempts < 10) {
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(finalName, fileBuffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: getContentType(finalName)
      });

    if (!error) {
      success = true;
    } else if (error && (error as any).error === 'Duplicate' || error.message?.includes('already exists')) {
      attempts++;
      const nameParts = sanitizedName.split('.');
      const ext = nameParts.pop();
      finalName = `${nameParts.join('.')}-${attempts}.${ext}`;
    } else {
      console.error(`Erro no upload of ${fileName}:`, error);
      return null;
    }
  }

  const { data: publicData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(finalName);

  return publicData.publicUrl;
}

function getContentType(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'png': return 'image/png';
    case 'jpg':
    case 'jpeg': return 'image/jpeg';
    case 'webp': return 'image/webp';
    case 'svg': return 'image/svg+xml';
    default: return 'application/octet-stream';
  }
}

async function migrate() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const mapping: Record<string, string> = {};
  
  async function walk(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        await walk(fullPath);
      } else if (/\.(png|jpg|jpeg|webp|svg)$/i.test(file)) {
        console.log(`Migrando: ${file}...`);
        const url = await uploadFile(fullPath);
        if (url) {
          // Store relative path from /public/images
          const relativePath = path.relative(path.join(process.cwd(), 'public'), fullPath).replace(/\\/g, '/');
          mapping[`/${relativePath}`] = url;
          console.log(`✅ Sucesso: /${relativePath} -> ${url}`);
        }
      }
    }
  }

  await walk(imagesDir);
  
  fs.writeFileSync(
    path.join(process.cwd(), 'src', 'scripts', 'image-mapping.json'),
    JSON.stringify(mapping, null, 2)
  );
  
  console.log('\nMigração concluída! Mapeamento salvo em src/scripts/image-mapping.json');
}

migrate().catch(console.error);
