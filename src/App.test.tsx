import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import type { Character } from './ts/interfaces/interfaces';
import * as api from './api/api';
import App from './App';

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'img.jpg',
    episode: [],
    url: '',
    created: '',
  },
];

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches characters and renders them', async () => {
    vi.spyOn(api, 'fetchCharacters').mockResolvedValueOnce({
      info: { count: 1, pages: 1, next: null, prev: null },
      results: mockCharacters,
    });

    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(''),
      setItem: vi.fn(),
    });

    render(<App />);

    const loaderShowUp = screen.getByTestId('loader');
    expect(loaderShowUp).toBeInTheDocument();

    await waitFor(() => {
      const characterLoad = screen.getByText('Rick Sanchez');
      expect(characterLoad).toBeInTheDocument();
    });

    const loaderDisappear = screen.queryByTestId('loader');
    expect(loaderDisappear).not.toBeInTheDocument();
  });

  it('displays error it fetch fails', async () => {
    vi.spyOn(api, 'fetchCharacters').mockRejectedValueOnce(
      new Error('Network error')
    );

    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(''),
      setItem: vi.fn(),
    });

    render(<App />);

    await waitFor(() => {
      const networkError = screen.getByText(/network error/i);
      expect(networkError).toBeInTheDocument();
    });

    const characterLoad = screen.queryByText('Rick Sanchez');
    expect(characterLoad).not.toBeInTheDocument();
  });

  it('used searchValue from localStorage', async () => {
    const fetchSpy = vi
      .spyOn(api, 'fetchCharacters')
      .mockRejectedValueOnce({ info: {}, result: [] });

    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue('Morty'),
      setItem: vi.fn(),
    });

    render(<App />);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('Morty');
    });
  });
});
