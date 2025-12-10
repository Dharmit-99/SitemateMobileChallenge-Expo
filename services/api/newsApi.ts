import { NewsApiParams, NewsResponse } from './types';

const API_KEY = '183daca270264bad86fc5b72972fb82a';
const BASE_URL = 'https://newsapi.org/v2';

class NewsApiService {
  private apiKey: string;

  constructor() {
    this.apiKey = API_KEY;
  }

  async searchEverything(params: NewsApiParams): Promise<NewsResponse> {
    const queryParams = new URLSearchParams({
      apiKey: this.apiKey,
      ...Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined)
      ),
    });

    const url = `${BASE_URL}/everything?${queryParams.toString()}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: NewsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }

  async searchByQuery(query: string, options?: Partial<NewsApiParams>): Promise<NewsResponse> {
    const defaultParams: NewsApiParams = {
      q: query,
      sortBy: 'popularity',
      pageSize: 20,
    };

    return this.searchEverything({ ...defaultParams, ...options });
  }

  async getTopHeadlines(): Promise<NewsResponse> {
    const queryParams = new URLSearchParams({
      country: 'us',
      apiKey: this.apiKey,
    });

    const url = `${BASE_URL}/top-headlines?${queryParams.toString()}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: NewsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw error;
    }
  }

}

export const newsApiService = new NewsApiService();
export default newsApiService;
