import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Carregar variáveis do .env da web
dotenv.config({ path: 'apps/web/.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Erro: Variáveis do Supabase não encontradas no .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadImage() {
  const filePath = "C:/Users/Leonardo/Desktop/cons-new-hero-bg-img.webp";
  const fileName = "cons-hero-bg-new.webp";
  const bucketName = "service_images";

  console.log(`Lendo arquivo: ${filePath}`);
  const fileBuffer = fs.readFileSync(filePath);

  console.log(`Fazendo upload para o bucket: ${bucketName}...`);
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileBuffer, {
      contentType: 'image/webp',
      upsert: true
    });

  if (error) {
    console.error("Erro no upload:", error.message);
    process.exit(1);
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  console.log("--- SUCESSO ---");
  console.log("Imagem na Galeria:", fileName);
  console.log("URL Pública:", publicUrl);
}

uploadImage();
