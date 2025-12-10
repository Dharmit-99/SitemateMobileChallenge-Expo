import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import newsApiService from '../services/api/newsApi';
import { NewsArticle } from '../types/types';

export const useGetTopHeadlines = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTopHeadlines = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await newsApiService.getTopHeadlines();
      setArticles(response.articles);
    } catch (error) {
      const errorMessage = "Failed to fetch top headlines";
      setError(errorMessage);
      Alert.alert("Error", errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopHeadlines();
  }, []);

  return {
    articles,
    loading,
    error,
    refetch: fetchTopHeadlines,
  };
};
