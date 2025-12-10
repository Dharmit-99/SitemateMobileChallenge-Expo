import storageService, { STORAGE_KEYS } from './storageService';

const MAX_HISTORY_ITEMS = 5;

export class SearchHistoryService {
  async getSearchHistory(): Promise<string[]> {
    const history = await storageService.get<string[]>(STORAGE_KEYS.SEARCH_HISTORY);
    return history || [];
  }

  async addToSearchHistory(searchTerm: string): Promise<void> {
    if (!searchTerm.trim()) return;

    const currentHistory = await this.getSearchHistory();

    const filteredHistory = currentHistory.filter(
      item => item.toLowerCase() !== searchTerm.toLowerCase()
    );

    const newHistory = [searchTerm, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);

    await storageService.set(STORAGE_KEYS.SEARCH_HISTORY, newHistory);
  }

  async clearSearchHistory(): Promise<void> {
    await storageService.remove(STORAGE_KEYS.SEARCH_HISTORY);
  }
}

export const searchHistoryService = new SearchHistoryService();
export default searchHistoryService;
