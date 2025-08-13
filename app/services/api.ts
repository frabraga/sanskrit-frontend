import type { SutraResponse, Sutra } from '../types/sutra';

const API_BASE_URL = 'http://localhost:1337/api';

export class ApiService {
  static async fetchSutras(): Promise<Sutra[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/sutras`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: SutraResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching sutras:', error);
      throw error;
    }
  }

  static async fetchSutraByNumber(number: string): Promise<Sutra | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/sutras?filters[number][$eq]=${number}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: SutraResponse = await response.json();
      return data.data.length > 0 ? data.data[0] : null;
    } catch (error) {
      console.error('Error fetching sutra by number:', error);
      throw error;
    }
  }

  static async fetchSutraById(id: string): Promise<Sutra | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/sutras/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching sutra by id:', error);
      throw error;
    }
  }
}
