import { useState, useEffect } from 'react';

export function useContent() {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const savedContent = localStorage.getItem('siteContent');
        if (savedContent) {
          setContent(JSON.parse(savedContent));
        } else {
          const defaultContent = await import('../data/siteContent.json');
          setContent(defaultContent.default);
        }
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  return { content, loading };
}