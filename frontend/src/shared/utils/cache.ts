import { fetchMockData } from './mockData';

const cache = new Map<string, any>();

export const getFromCache = (key: string) => {
  const jsonData = localStorage.getItem(key);
  if (jsonData) {
    const data = JSON.parse(jsonData);
    cache.set(key, data);
    return data;
  }
  if (cache.has(key)) {
    return cache.get(key);
  }
  return null;
};

export const setToCache = (key: string, value: any) => {
  cache.set(key, value);
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearCache = () => {
  cache.clear();
  localStorage.clear();
};

export const loadAllDataIntoCache = async () => {
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
  for (const filename of filenames) {
    const data = await fetchMockData(filename);
    setToCache(filename, data);
  }
};
