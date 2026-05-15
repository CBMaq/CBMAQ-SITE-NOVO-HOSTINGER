import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const imagesToUpload = [
  { name: 'maintenance.png', path: 'C:/Users/Leonardo/.gemini/antigravity/brain/0ec323d0-ced8-48d2-9b70-01cba311ee25/cbmaq_maintenance_post_1776095378846.png' },
  { name: 'consortium.png', path: 'C:/Users/Leonardo/.gemini/antigravity/brain/0ec323d0-ced8-48d2-9b70-01cba311ee25/cbmaq_consortium_post_1776095403961.png' },
  { name: 'parts.png', path: 'C:/Users/Leonardo/.gemini/antigravity/brain/0ec323d0-ced8-48d2-9b70-01cba311ee25/cbmaq_parts_post_v2_1776095424941.png' }
];

async function upload() {
  console.log("Iniciando upload de imagens...");
  for (const img of imagesToUpload) {
    try {
      const fileContent = fs.readFileSync(img.path);
      const { data, error } = await supabase.storage
        .from('service_images') // Bucket que sabemos que existe
        .upload(`blog/${img.name}`, fileContent, {
          contentType: 'image/png',
          upsert: true
        });

      if (error) {
        console.error(`Falha ao subir ${img.name}:`, error);
        continue;
      }
      const { data: pData } = supabase.storage.from('service_images').getPublicUrl(`blog/${img.name}`);
      console.log(`UPLOADED ${img.name}: ${pData.publicUrl}`);
    } catch (e) {
      console.error(`Erro ao processar ${img.name}:`, e);
    }
  }
}

upload();
