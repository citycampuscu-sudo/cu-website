hereimport { supabase } from '../lib/supabase';

export interface AlumniEventRegistration {
  id?: string;
  event_id: string;
  full_name: string;
  email: string;
  phone?: string;
  graduation_year?: number | null;
  course?: string;
  occupation?: string;
  location?: string;
  registered_at?: string;
}

export async function registerForAlumniEvent(
  registration: AlumniEventRegistration
) {
  const payload = {
    ...registration,
    email: registration.email.trim().toLowerCase(),
  };

  const { data, error } = await supabase
    .from('alumni_event_registrations')
    .insert(payload)
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      throw new Error(
        'You have already registered for this alumni event.'
      );
    }

    throw error;
  }

  return data;
}
