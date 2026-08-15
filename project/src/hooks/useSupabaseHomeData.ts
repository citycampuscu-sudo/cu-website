import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface HomeEvent {
  id?: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  created_at?: string;
}

export interface HomeLeader {
  id?: string;
  name: string;
  position?: string;
  course?: string;
  year?: string;
  bio?: string;
  image?: string;
  created_at?: string;
}

export interface HomeGalleryImage {
  id?: string;
  title?: string;
  description?: string;
  category?: string;
  image_url: string;
  storage_path?: string;
  created_at?: string;
}

interface UseSupabaseHomeDataReturn {
  events: HomeEvent[];
  leaders: HomeLeader[];
  galleryImages: HomeGalleryImage[];
  loading: boolean;
  error: string | null;
  refreshHomeData: () => Promise<void>;
}

export function useSupabaseHomeData(): UseSupabaseHomeDataReturn {
  const [events, setEvents] = useState<HomeEvent[]>([]);
  const [leaders, setLeaders] = useState<HomeLeader[]>([]);
  const [galleryImages, setGalleryImages] = useState<HomeGalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHomeData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [
        eventsResponse,
        leadersResponse,
        galleryResponse,
      ] = await Promise.all([
        supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: false }),

        supabase
          .from('leaders')
          .select('*')
          .order('created_at', { ascending: true }),

        supabase
          .from('gallery_images')
          .select('*')
          .order('created_at', { ascending: false }),
      ]);

      if (eventsResponse.error) {
        throw new Error(
          `Events: ${eventsResponse.error.message}`
        );
      }

      if (leadersResponse.error) {
        throw new Error(
          `Leadership: ${leadersResponse.error.message}`
        );
      }

      if (galleryResponse.error) {
        throw new Error(
          `Gallery: ${galleryResponse.error.message}`
        );
      }

      setEvents(
        (eventsResponse.data || []) as HomeEvent[]
      );

      setLeaders(
        (leadersResponse.data || []) as HomeLeader[]
      );

      setGalleryImages(
        (galleryResponse.data || []) as HomeGalleryImage[]
      );

    } catch (err: any) {
      console.error(
        'Home Supabase data error:',
        err
      );

      setError(
        err?.message ||
        'Unable to load homepage data.'
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();

    /*
     * Keep the homepage synchronized with database
     * changes where Supabase Realtime is enabled.
     */

    const eventsChannel = supabase
      .channel('home-events')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events',
        },
        () => {
          fetchHomeData();
        }
      )
      .subscribe();

    const leadersChannel = supabase
      .channel('home-leaders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leaders',
        },
        () => {
          fetchHomeData();
        }
      )
      .subscribe();

    const galleryChannel = supabase
      .channel('home-gallery')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gallery_images',
        },
        () => {
          fetchHomeData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(eventsChannel);
      supabase.removeChannel(leadersChannel);
      supabase.removeChannel(galleryChannel);
    };
  }, []);

  return {
    events,
    leaders,
    galleryImages,
    loading,
    error,
    refreshHomeData: fetchHomeData,
  };
}
