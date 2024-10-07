import { describe, it, vi, expect } from 'vitest';
import { fetchMockData } from '@/shared/utils/mockData';

describe('fetchMockData', () => {
  it('fetches mock data for a given filename', async () => {
    const filename = 'characters';
    const mockResponse = { data: 'mockData' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue(JSON.stringify(mockResponse)),
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const result = await fetchMockData(filename);
    expect(global.fetch).toHaveBeenCalledWith(`/json/${filename}.json`);
    expect(result).toEqual(mockResponse);
  });
});
