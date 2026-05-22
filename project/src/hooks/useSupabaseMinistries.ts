import { useSupabaseData } from './useSupabaseData';
import { Ministry } from '../lib/supabase';

export const useSupabaseMinistries = () => {
  const { data, loading } = useSupabaseData();

  return {
    ministries: (data?.ministries || []) as Ministry[],
    loading
  };
};
