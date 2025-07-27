import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  fetchCharacters,
  fetchCharactersPagination,
  fetchCharacterById,
} from './api';
import type {
  ApiResponseCharacter,
  Character,
} from '../ts/interfaces/interfaces';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockApiResponse: ApiResponseCharacter = {
  info: {
    count: 1,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: 'url',
      episode: [],
      url: '',
      created: '',
    },
  ],
};

const mockCharacter: Character = mockApiResponse.results[0];

describe('API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv(
      'VITE_RICK_AND_MORTY_BASE_URL',
      'https://rickandmortyapi.com/api'
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.unstubAllEnvs();
  });

  // fetchCharacters
  describe('fetchCharacters', () => {
    it('fetches all characters without name', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce(mockApiResponse),
      });

      const result = await fetchCharacters();
      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character'
      );
      expect(result).toEqual(mockApiResponse);
    });

    it('fetches characters by name', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce(mockApiResponse),
      });

      const result = await fetchCharacters('Rick');
      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character?name=Rick'
      );
      expect(result).toEqual(mockApiResponse);
    });

    it('throws error if BASE_URL is undefined', async () => {
      vi.stubEnv('VITE_RICK_AND_MORTY_BASE_URL', undefined);
      await expect(fetchCharacters()).rejects.toThrow(
        'API URL is not defined in environment variables'
      );
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('throws error if response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });
      await expect(fetchCharacters()).rejects.toThrow(
        'Network response was not ok'
      );
    });

    it('throws error if JSON fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
      });
      await expect(fetchCharacters()).rejects.toThrow('Invalid JSON');
    });
  });

  // fetchCharactersPagination
  describe('fetchCharactersPagination', () => {
    it('fetches characters with full URL', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce(mockApiResponse),
      });

      const result = await fetchCharactersPagination('https://test.com');
      expect(mockFetch).toHaveBeenCalledWith('https://test.com');
      expect(result).toEqual(mockApiResponse);
    });

    it('throws error if response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Server Error',
      });
      await expect(
        fetchCharactersPagination('https://test.com')
      ).rejects.toThrow('Network response was not ok');
    });

    it('throws error if JSON parsing fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockRejectedValueOnce(new Error('Broken JSON')),
      });

      await expect(
        fetchCharactersPagination('https://test.com')
      ).rejects.toThrow('Broken JSON');
    });
  });

  // fetchCharacterById
  describe('fetchCharacterById', () => {
    it('fetches character by ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValueOnce(mockCharacter),
      });

      const result = await fetchCharacterById('1');
      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/1'
      );
      expect(result).toEqual(mockCharacter);
    });

    it('throws if BASE_URL is undefined', async () => {
      vi.stubEnv('VITE_RICK_AND_MORTY_BASE_URL', undefined);
      await expect(fetchCharacterById('1')).rejects.toThrow(
        'API URL is not defined in environment variables'
      );
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('throws if response is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });
      await expect(fetchCharacterById('999')).rejects.toThrow(
        'Character not found'
      );
    });

    it('throws if JSON is invalid', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockRejectedValueOnce(new Error('JSON Parse Error')),
      });
      await expect(fetchCharacterById('1')).rejects.toThrow('JSON Parse Error');
    });
  });
});
