import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharactersPage from '../CharactersPage/CharactersPage';
import type { Character } from '../../ts/interfaces/interfaces';
import * as api from '../../api/api';

vi.mock('../src/components/SearchSection/SearchSection', () => ({
  default: ({ fetchData }: { fetchData: (value: string) => void }) => (
    <div>
      <button onClick={() => fetchData('rick')}>Search Rick</button>
    </div>
  ),
}));

vi.mock('../src/components/CardSection/CardSection', () => ({
  default: ({ characters }: { characters: Character[] }) => (
    <ul>
      {characters.map((char) => (
        <li key={char.id}>{char.name}</li>
      ))}
    </ul>
  ),
}));

vi.mock('../src/components/Loader/Loader', () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock('../src/components/ErrorButton/ErrorButton', () => ({
  default: () => <button>ErrorButton</button>,
}));

vi.mock('../src/components/Pagination/Pagination', () => ({
  default: () => <div data-testid="pagination">Pagination Component</div>,
}));

vi.stubEnv('VITE_RICK_AND_MORTY_BASE_URL', 'https://example.com/api');

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('CharactersPage', () => {
  // it('renders characters fetched from API', async () => {
  //   const mockCharacter: Character = {
  //     id: 1,
  //     name: 'Rick Sanchez',
  //     status: 'Alive',
  //     species: 'Human',
  //     type: '',
  //     gender: 'Male',
  //     origin: { name: 'Earth', url: '' },
  //     location: { name: 'Earth', url: '' },
  //     image: 'rick.png',
  //     episode: [],
  //     url: '',
  //     created: '',
  //   };

  //   vi.spyOn(api, 'fetchCharacters').mockResolvedValue({
  //     results: [mockCharacter],
  //     info: {
  //       next: 'next-url',
  //       prev: null,
  //       pages: 3,
  //       count: 60,
  //     },
  //   });

  //   render(
  //     <MemoryRouter>
  //       <CharactersPage />
  //     </MemoryRouter>
  //   );

  //   expect(screen.getByTestId('loader')).toBeInTheDocument();

  //   await waitFor(() => {
  //     expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  //   });

  //   expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  //   expect(screen.getByTestId('pagination')).toBeInTheDocument();
  // });

  it('handles API error gracefully', async () => {
    vi.spyOn(api, 'fetchCharacters').mockRejectedValue(new Error('API Error'));

    render(
      <MemoryRouter>
        <CharactersPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });

  // it('updates characters on search', async () => {
  //   const summer: Character = {
  //     id: 1,
  //     name: 'Summer',
  //     status: 'Alive',
  //     species: 'Human',
  //     type: '',
  //     gender: 'Female',
  //     origin: { name: 'Earth', url: '' },
  //     location: { name: 'Earth', url: '' },
  //     image: 'summer.png',
  //     episode: [],
  //     url: '',
  //     created: '',
  //   };

  //   const rick: Character = {
  //     id: 2,
  //     name: 'Rick Sanchez',
  //     status: 'Alive',
  //     species: 'Human',
  //     type: '',
  //     gender: 'Male',
  //     origin: { name: 'Earth', url: '' },
  //     location: { name: 'Earth', url: '' },
  //     image: 'rick.png',
  //     episode: [],
  //     url: '',
  //     created: '',
  //   };

  //   vi.spyOn(api, 'fetchCharacters')
  //     .mockResolvedValueOnce({
  //       results: [summer],
  //       info: { next: null, prev: null, pages: 1, count: 20 },
  //     })
  //     .mockResolvedValueOnce({
  //       results: [rick],
  //       info: { next: null, prev: null, pages: 1, count: 20 },
  //     });

  //   render(
  //     <MemoryRouter>
  //       <CharactersPage />
  //     </MemoryRouter>
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText('Summer')).toBeInTheDocument();
  //   });

  //   const searchButton = await screen.findByText('Search');
  //   searchButton.click();

  //   await waitFor(() => {
  //     expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  //   });
  // });
});
