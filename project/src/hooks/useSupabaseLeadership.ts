import { useSupabaseData } from './useSupabaseData';
import { Leader, LeadershipRole } from '../lib/supabase';

export const useSupabaseLeadership = () => {
  const { data, loading } = useSupabaseData();

  return {
    leaders: (data?.leaders || []) as Leader[],
    roles: (data?.roles || []) as LeadershipRole[],
    loading
  };
};