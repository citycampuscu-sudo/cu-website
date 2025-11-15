import { useState, useEffect } from 'react';
import { supabase, Leader, LeadershipRole } from '../lib/supabase';

export const useSupabaseLeadership = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [roles, setRoles] = useState<LeadershipRole[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaders = async () => {
    try {
      const [leadersResponse, rolesResponse] = await Promise.all([
        supabase.from('leaders').select('*').order('created_at', { ascending: true }),
        supabase.from('leadership_roles').select('*').order('created_at', { ascending: true })
      ]);
      
      if (leadersResponse.error) throw leadersResponse.error;
      if (rolesResponse.error) throw rolesResponse.error;
      
      setLeaders(leadersResponse.data || []);
      setRoles(rolesResponse.data || []);
    } catch (error) {
      console.error('Error fetching leadership data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  return { leaders, roles, loading, refetch: fetchLeaders };
};