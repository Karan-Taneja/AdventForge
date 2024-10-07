import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import {
  getFromCache,
  setToCache,
  clearCache,
  loadAllDataIntoCache,
} from '@/shared/utils/cache';
import { fetchMockData } from '@/shared/utils/mockData';

vi.mock('@/shared/utils/mockData', () => ({
  fetchMockData: vi.fn(),
}));

describe('cache.ts', () => {
  beforeEach(() => {
    // Clear the cache and localStorage before each test
    clearCache();
    vi.spyOn(Storage.prototype, 'getItem').mockClear();
    vi.spyOn(Storage.prototype, 'setItem').mockClear();
    vi.spyOn(Storage.prototype, 'clear').mockClear();
  });

  describe('getFromCache', () => {
    it('retrieves data from localStorage if it exists', () => {
      const key = 'testKey';
      const value = { data: 'testData' };
      localStorage.setItem(key, JSON.stringify(value));

      const result = getFromCache(key);
      expect(result).toEqual(value);
      expect(localStorage.getItem).toHaveBeenCalledWith(key);
    });

    it('retrieves data from the cache if it exists', () => {
      const key = 'testKey';
      const value = { data: 'testData' };
      setToCache(key, value);

      const result = getFromCache(key);
      expect(result).toEqual(value);
    });

    it('returns null if the data does not exist in either localStorage or the cache', () => {
      const key = 'nonExistentKey';
      const result = getFromCache(key);
      expect(result).toBeNull();
    });
  });

  describe('setToCache', () => {
    it('stores data in both the cache and localStorage', () => {
      const key = 'testKey';
      const value = { data: 'testData' };

      setToCache(key, value);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        key,
        JSON.stringify(value),
      );

      const cachedValue = getFromCache(key);
      expect(cachedValue).toEqual(value);
    });
  });

  describe('clearCache', () => {
    it('clears both the cache and localStorage', () => {
      const key = 'testKey';
      const value = { data: 'testData' };

      setToCache(key, value);
      clearCache();

      const cachedValue = getFromCache(key);
      expect(cachedValue).toBeNull();
      expect(localStorage.clear).toHaveBeenCalled();
    });
  });

  describe('loadAllDataIntoCache', () => {
    it('fetches data for each filename and sets it to the cache', async () => {
      const filenames = [
        'characters',
        'option_choices',
        'pokemon_advance_classes',
        'pokemon_classes',
        'pokemon_natures',
        'pokemon_species',
        'pokemon_type_matchups',
        'users',
      ];
      const mockData = { data: 'mockData' };
      (fetchMockData as Mock).mockResolvedValue(mockData);

      await loadAllDataIntoCache();

      for (const filename of filenames) {
        expect(fetchMockData).toHaveBeenCalledWith(filename);
      }
    });
  });
});
