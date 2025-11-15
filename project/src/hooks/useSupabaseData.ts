import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

let cachedData: any = null;
let isLoading = false;
let listeners: Array<(data: any) => void> = [];

export const useSupabaseData = () => {
  const [data, setData] = useState(cachedData);
  const [loading, setLoading] = useState(!cachedData);

  useEffect(() => {
    if (cachedData) {
      setData(cachedData);
      setLoading(false);
      return;
    }

    if (isLoading) {
      listeners.push(setData);
      return () => {
        listeners = listeners.filter(l => l !== setData);
      };
    }

    isLoading = true;
    
    const fetchAll = async () => {
      try {
        const [leadersRes, rolesRes, eventsRes, imagesRes] = await Promise.all([
          supabase.from('leaders').select('*').order('created_at', { ascending: true }),
          supabase.from('leadership_roles').select('*').order('created_at', { ascending: true }),
          supabase.from('events').select('*').order('date', { ascending: true }),
          supabase.from('gallery_images').select('*').order('created_at', { ascending: false })
        ]);

        cachedData = {
          leaders: leadersRes.data || [],
          roles: rolesRes.data || [],
          events: eventsRes.data || [],
          images: imagesRes.data || []
        };

        setData(cachedData);
        listeners.forEach(listener => listener(cachedData));
        listeners = [];
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        isLoading = false;
      }
    };

    fetchAll();
  }, []);

  return { data, loading };
};
