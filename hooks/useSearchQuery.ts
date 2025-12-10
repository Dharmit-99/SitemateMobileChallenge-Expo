import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import newsApiService from '../services/api/newsApi';
import { NewsArticle } from '../services/types';

export const useSearchQuery = (debounceMs: number = 500) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const debounceRef = useRef<number>(null);

  const searchNews = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setArticles([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await newsApiService.searchByQuery(searchQuery);
      setArticles(response.articles);
    } catch (error) {
      const errorMessage = "Failed to fetch news articles";
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchNews(searchQuery);
    }, debounceMs);
  }, [searchNews, debounceMs]);

  const clearSearch = () => {
    setArticles([]);
    setError(null);
    setQuery('');
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
    articles,
    loading,
    error,
    query,
    debouncedSearch,
    clearSearch,
  };
};
