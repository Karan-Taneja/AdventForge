import { getFromCache, setToCache } from './cache';

export const fetchMockData = async (filename: string) => {
  const cachedData = getFromCache(filename);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`/json/${filename}.json`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Log the raw response text
    const responseText = await response.text();

    // Parse the response text as JSON
    const data = JSON.parse(responseText);

    setToCache(filename, data);
    return data;
  } catch (error) {
    console.error(`Error fetching mock data for ${filename}:`, error);
    throw error;
  }
};
