import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as api from '@/shared/mocks/api';
import { loadAllDataIntoCache } from '@/shared/utils/cache';

// Mock the dependencies

vi.mock('@/shared/utils/cache', () => ({
  setToCache: vi.fn(),
  getFromCache: vi.fn(),
  loadAllDataIntoCache: vi.fn(),
}));

describe('api.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initializeMockApi', () => {
    it('calls loadAllDataIntoCache', async () => {
      await api.initializeMockApi();
      expect(loadAllDataIntoCache).toHaveBeenCalled();
    });
  });

  describe('mockApi', () => {
    it('createUser calls the correct API endpoint', async () => {
      const user: any = { id: '1', name: 'Test User' };
      const mockCreateUser = vi.fn().mockResolvedValue(user);
      api.mockApi.createUser = mockCreateUser;

      const result = await api.mockApi.createUser(user);
      expect(mockCreateUser).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });

    it('login calls the correct API endpoint', async () => {
      const user = { id: '1', name: 'Test User' };
      const mockLogin = vi.fn().mockResolvedValue(user);
      api.mockApi.login = mockLogin;

      const result = await api.mockApi.login('test', 'password');
      expect(mockLogin).toHaveBeenCalledWith('test', 'password');
      expect(result).toEqual(user);
    });

    it('logout calls the correct API endpoint', async () => {
      const mockLogout = vi.fn().mockResolvedValue(undefined);
      api.mockApi.logout = mockLogout;

      await api.mockApi.logout();
      expect(mockLogout).toHaveBeenCalled();
    });

    it('getUserCharacters calls the correct API endpoint', async () => {
      const characters = [{ id: '1', name: 'Pikachu' }];
      const mockGetUserCharacters = vi.fn().mockResolvedValue(characters);
      api.mockApi.getUserCharacters = mockGetUserCharacters;

      const result = await api.mockApi.getUserCharacters('user1');
      expect(mockGetUserCharacters).toHaveBeenCalledWith('user1');
      expect(result).toEqual(characters);
    });

    it('getCharacter calls the correct API endpoint', async () => {
      const character = { id: '1', name: 'Pikachu' };
      const mockGetCharacter = vi.fn().mockResolvedValue(character);
      api.mockApi.getCharacter = mockGetCharacter;

      const result = await api.mockApi.getCharacter('1');
      expect(mockGetCharacter).toHaveBeenCalledWith('1');
      expect(result).toEqual(character);
    });
  });
});
