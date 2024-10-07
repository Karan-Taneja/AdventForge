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
