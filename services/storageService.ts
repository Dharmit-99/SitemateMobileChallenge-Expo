import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys constants
export const STORAGE_KEYS = {
  SEARCH_HISTORY: 'searchHistory',
} as const;

class StorageService {
  /**
   * Get data from AsyncStorage
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting data for key "${key}":`, error);
      return null;
    }
  }

  /**
   * Set data in AsyncStorage
   */
  async set<T>(key: string, value: T): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting data for key "${key}":`, error);
      return false;
    }
  }

  /**
   * Remove data from AsyncStorage
   */
  async remove(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing data for key "${key}":`, error);
      return false;
    }
  }
}

export const storageService = new StorageService();
export default storageService;
