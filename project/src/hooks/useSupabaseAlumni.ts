import { supabase } from '../lib/supabase';

export async function createAlumni(data: any) {
  const { error } = await supabase
    .from('alumni')
    .insert([data]);

  if (error) throw error;
}
