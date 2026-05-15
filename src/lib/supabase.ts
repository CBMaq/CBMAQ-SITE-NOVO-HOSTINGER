import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

function sanitizeFileName(name: string): string {
  const nameWithoutExt = name.substring(0, name.lastIndexOf('.'));
  const ext = name.split('.').pop();
  
  const sanitized = nameWithoutExt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
    
  return `${sanitized}.${ext}`;
}

export async function uploadImage(file: File, bucketName: string = 'service_images'): Promise<string> {
  const originalName = sanitizeFileName(file.name);
  let fileName = originalName;
  let attempts = 0;
  let success = false;

  while (!success && attempts < 10) {
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (!error) {
      success = true;
    } else if (error && (error as any).error === 'Duplicate' || error.message?.includes('already exists')) {
      attempts++;
      const nameParts = originalName.split('.');
      const ext = nameParts.pop();
      fileName = `${nameParts.join('.')}-${attempts}.${ext}`;
    } else {
      console.error('Erro no upload para o Supabase:', error);
      throw new Error('Falha ao fazer upload da imagem.');
    }
  }

  if (!success) {
    throw new Error('Não foi possível gerar um nome de arquivo único após várias tentativas.');
  }

  const { data: publicData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  return publicData.publicUrl;
}
