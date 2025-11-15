import { useSupabaseData } from './useSupabaseData';
import { Event } from '../lib/supabase';

export const useSupabaseEvents = () => {
  const { data, loading } = useSupabaseData();

  return {
    events: (data?.events || []) as Event[],
    loading
  };
};
