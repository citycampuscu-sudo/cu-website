import { supabase } from './supabase';
import type { Document } from './supabase';

/**
 * Upload a new document
 */
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

/**
 * Delete a document
 */
export async function deleteDocument(document: Document) {
  // Delete the file from Storage
  const { error: storageError } = await supabase.storage
    .from('documents')
    .remove([document.storage_path]);

  if (storageError) {
    throw storageError;
  }

  // Delete the database record
  const { error: dbError } = await supabase
    .from('documents')
    .delete()
    .eq('id', document.id);

  if (dbError) throw dbError;
}

/**
 * Update a document
 * Optionally replaces the uploaded file.
 */
export async function updateDocument(
  document: Document,
  updates: {
    title: string;
    description: string;
    category: 'home' | 'alumni';
    file?: File | null;
  }
) {
  let fileUrl = document.file_url;
  let storagePath = document.storage_path;

  // Replace file if a new one is selected
  if (updates.file) {
    // Delete old file
    const { error: deleteError } = await supabase.storage
      .from('documents')
      .remove([document.storage_path]);

    if (deleteError) throw deleteError;

    // Upload new file
    const newPath = `${Date.now()}-${updates.file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(newPath, updates.file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('documents')
      .getPublicUrl(newPath);

    fileUrl = data.publicUrl;
    storagePath = newPath;
  }

  // Update database record
  const { error } = await supabase
    .from('documents')
    .update({
      title: updates.title,
      description: updates.description,
      category: updates.category,
      file_url: fileUrl,
      storage_path: storagePath,
    })
    .eq('id', document.id);

  if (error) throw error;
}
