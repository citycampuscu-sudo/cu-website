import { useState, useEffect, useCallback } from 'react';
import { supabase, Document } from '../lib/supabase';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      setDocuments(data || []);
      setError(null);

    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load documents.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    loading,
    error,
    refreshDocuments: fetchDocuments,
  };
}
