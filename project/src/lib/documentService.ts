import { supabase } from './supabase';

export async function uploadDocument(
  file: File,
  title: string,
  description: string,
  category: 'home' | 'alumni'
) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error: storageError } = await supabase.storage
    .from('documents')
    .upload(fileName, file);

  if (storageError) throw storageError;

  const { data } = supabase.storage
    .from('documents')
    .getPublicUrl(fileName);

  const { error: dbError } = await supabase
    .from('documents')
    .insert({
      title,
      description,
      category,
      file_url: data.publicUrl,
    });

  if (dbError) throw dbError;

  return true;
}
