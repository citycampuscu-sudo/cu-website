import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

let cachedData: any = null;
let isLoading = false;
let listeners: Array<(data: any) => void> = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useSupabaseData = () => {
  const [data, setData] = useState(cachedData);
  const [loading, setLoading] = useState(!cachedData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const now = Date.now();
    const cacheExpired = now - lastFetchTime > CACHE_DURATION;

    if (cachedData && !cacheExpired) {
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
    setLoading(true);
    
    const fetchAll = async () => {
      try {
        console.log('Fetching Supabase data...');
        
        const [leadersRes, rolesRes, eventsRes, imagesRes, ministriesRes] = await Promise.all([
          supabase.from('leaders').select('*').order('created_at', { ascending: true }),
          supabase.from('leadership_roles').select('*').order('created_at', { ascending: true }),
          supabase.from('events').select('*').order('date', { ascending: true }),
          supabase.from('gallery_images').select('*').order('created_at', { ascending: false }),
          supabase.from('ministries').select('*').order('created_at', { ascending: true })
        ]);

        // Log the responses to debug
        console.log('Leaders:', leadersRes.data?.length || 0, 'Error:', leadersRes.error);
        console.log('Roles:', rolesRes.data?.length || 0, 'Error:', rolesRes.error);
        console.log('Events:', eventsRes.data?.length || 0, 'Error:', eventsRes.error);
        console.log('Images:', imagesRes.data?.length || 0, 'Error:', imagesRes.error);
        console.log('Ministries:', ministriesRes.data?.length || 0, 'Error:', ministriesRes.error);

        // Check for errors
        const errors = [leadersRes.error, rolesRes.error, eventsRes.error, imagesRes.error, ministriesRes.error].filter(Boolean);
        if (errors.length > 0) {
          console.error('Fetch errors:', errors);
          const errorMessage = errors.map(e => e?.message).join('; ');
          setError(errorMessage);
        } else {
          setError(null);
        }

        cachedData = {
          leaders: leadersRes.data || [],
          roles: rolesRes.data || [],
          events: eventsRes.data || [],
          images: imagesRes.data || [],
          ministries: ministriesRes.data || []
        };

        lastFetchTime = Date.now();
        setData(cachedData);
        listeners.forEach(listener => listener(cachedData));
        listeners = [];
      } catch (error) {
        console.error('Error fetching Supabase data:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
        isLoading = false;
      }
    };

    fetchAll();
  }, []);

  return { data, loading, error };
};
