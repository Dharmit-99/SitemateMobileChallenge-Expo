import { useCallback, useRef } from 'react';
import { useSearchHistory } from './useSearchHistory';

const HISTORY_DELAY_MS = 3000;

export const useDelayedSearchHistory = () => {
  const { addToHistory } = useSearchHistory();
  const delayedHistoryRef = useRef<number | null>(null);

  const scheduleHistoryAdd = useCallback((searchText: string) => {
    // Clear any existing timer
    if (delayedHistoryRef.current) {
      clearTimeout(delayedHistoryRef.current);
    }

    // Only schedule if there's actual search text
    if (searchText.trim()) {
      delayedHistoryRef.current = setTimeout(() => {
        addToHistory(searchText);
      }, HISTORY_DELAY_MS);
    }
  }, [addToHistory]);

  const cancelHistoryAdd = useCallback(() => {
    if (delayedHistoryRef.current) {
      clearTimeout(delayedHistoryRef.current);
      delayedHistoryRef.current = null;
    }
  }, []);

  return {
    scheduleHistoryAdd,
    cancelHistoryAdd,
  };
};
