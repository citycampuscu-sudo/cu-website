import { useEffect, useState } from "react";
import { supabase, Document } from "../lib/supabase";

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) {
      setDocuments(data);
    }

    setLoading(false);
  }

  return { documents, loading };
}
