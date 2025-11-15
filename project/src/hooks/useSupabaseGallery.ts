import { useState } from 'react';
import { supabase, GalleryImage } from '../lib/supabase';
import { useSupabaseData } from './useSupabaseData';

export const useSupabaseGallery = () => {
  const { data, loading } = useSupabaseData();
  const [images, setImages] = useState<GalleryImage[]>(data?.images || []);

  const fetchImages = async () => {
    // Already cached
  };

  const uploadImage = async (file: File, title: string, description: string, category: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath);

      const { data, error } = await supabase
        .from('gallery_images')
        .insert([{
          title,
          description,
          category,
          image_url: publicUrl,
          storage_path: filePath
        }])
        .select()
        .single();

      if (error) throw error;
      
      setImages(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const updateImage = async (id: string, title: string, description: string, category: string) => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .update({ title, description, category })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setImages(prev => prev.map(img => img.id === id ? data : img));
      return data;
    } catch (error) {
      console.error('Error updating image:', error);
      throw error;
    }
  };

  const deleteImage = async (id: string, storagePath: string) => {
    try {
      await supabase.storage
        .from('gallery-images')
        .remove([storagePath]);

      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setImages(prev => prev.filter(img => img.id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  };

  if (data?.images && images.length === 0) {
    setImages(data.images);
  }

  return { images, loading, uploadImage, updateImage, deleteImage, refetch: fetchImages };
};