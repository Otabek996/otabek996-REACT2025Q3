import { vi, describe, it, expect, beforeEach } from 'vitest';
// import type { ApiResponseCharacter } from '../ts/interfaces/interfaces';
import { fetchCharacters } from './api';

const mockData = {
  info: { count: 1, pages: 1, next: null, prev: null },
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
      image: 'image.jpg',
      episode: ['episode1'],
      url: 'url',
      created: 'date',
    },
  ],
};

describe('fetchCharacters', () => {
  type MockedImportMetaEnv = {
    VITE_RICK_AND_MORTY_BASE_URL: string;
  };

  const URL = import.meta.env.VITE_RICK_AND_MORTY_BASE_URL;

  beforeEach(() => {
    vi.resetAllMocks();
    (
      import.meta.env as unknown as MockedImportMetaEnv
    ).VITE_RICK_AND_MORTY_BASE_URL = URL;
  });

  it('calls correct URL without name', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData,
      })
    );

    vi.stubGlobal('import.meta', {
      env: {
        VITE_RICK_AND_MORTY_BASE_URL: URL,
      },
    });

    await fetchCharacters();
    expect(fetch).toHaveBeenCalledWith(`${URL}/character`);
  });

  it('calls correct URL with name', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData,
      })
    );

    vi.stubGlobal('import.meta', {
      env: {
        VITE_RICK_AND_MORTY_BASE_URL: URL,
      },
    });

    await fetchCharacters('Rick');
    expect(fetch).toHaveBeenCalledWith(`${URL}/character?name=Rick`);
  });

  it('throws on network error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    }) as typeof fetch;

    await expect(fetchCharacters()).rejects.toThrow(
      'Network response was not ok'
    );
  });

  it('returns data when response is OK', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    }) as typeof fetch;

    const result = await fetchCharacters();
    expect(result).toEqual(mockData);
  });
});
