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
    storage_path: fileName,
  });

  if (dbError) throw dbError;
}

export async function deleteDocument(document: {
  id: string;
  file_url: string;
}) {
  // Extract the filename from the public URL
  const fileName = document.file_url.split('/').pop();

  if (fileName) {
    const { error: storageError } = await supabase.storage
      .from('documents')
      .remove([fileName]);

    if (storageError) {
      console.error(storageError);
    }
  }

  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', document.id);

  if (error) throw error;
}
