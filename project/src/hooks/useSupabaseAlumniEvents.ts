import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

export interface AlumniEvent {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  venue: string;
  image: string | null;
  registration_link: string | null;
}

export function useSupabaseAlumniEvents() {
  const [events, setEvents] = useState<AlumniEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("alumni_events")
      .select("*")
      .eq("published", true)
      .order("event_date", { ascending: true });

    if (!error && data) {
      setEvents(data);
    }

    setLoading(false);
  }

  return { events, loading };
}
