import { useState, useEffect, useCallback } from 'react';
import searchHistoryService from '../services/searchHistoryService';

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const loadSearchHistory = useCallback(async () => {
    const history = await searchHistoryService.getSearchHistory();
    setSearchHistory(history);
  }, []);

  const addToHistory = useCallback(async (searchTerm: string) => {
    await searchHistoryService.addToSearchHistory(searchTerm);
    await loadSearchHistory(); // Refresh the history
  }, [loadSearchHistory]);

  const clearHistory = useCallback(async () => {
    await searchHistoryService.clearSearchHistory();
    setSearchHistory([]);
  }, []);

  useEffect(() => {
    loadSearchHistory();
  }, [loadSearchHistory]);

  return {
    searchHistory,
    addToHistory,
    clearHistory,
    refreshHistory: loadSearchHistory,
  };
};