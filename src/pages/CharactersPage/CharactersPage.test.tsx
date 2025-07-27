import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharactersPage from './CharactersPage';
import * as api from '../../api/api';
import { useSearchLocalStorage } from '../../hooks/useSearchLocalStorage';
import type {
  Character,
  ApiResponseCharacter,
} from '../../ts/interfaces/interfaces';

vi.mock('../../api/api');
vi.mock('../../hooks/useSearchLocalStorage');

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
    image: 'rick.png',
    episode: ['https://api.com/episode/1'],
    url: '',
  },
];

const mockResponse: ApiResponseCharacter = {
  info: {
    count: 2,
    pages: 2,
    next: 'https://api.com?page=3',
    prev: 'https://api.com?page=1',
  },
  results: mockCharacters,
};

const CharacterDetail = () => <div>Character Detail</div>;

describe('CharactersPage', () => {
  let storedSearchValue = '';

  beforeEach(() => {
    vi.mocked(api.fetchCharactersPagination).mockResolvedValue(mockResponse);
    vi.mocked(api.fetchCharacters).mockResolvedValue(mockResponse);
    vi.mocked(useSearchLocalStorage).mockReturnValue({
      searchValue: storedSearchValue,
      updateSearchValue: vi.fn((value) => {
        storedSearchValue = value;
      }),
      cleaneSearchValue: vi.fn(() => {
        storedSearchValue = '';
      }),
      getStoredSearchValue: vi.fn(() => storedSearchValue),
    });
  });

  const baseRoute = '/otabek996-REACT2025Q3/characters';
  const renderPage = (initialEntries = [`${baseRoute}`]) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path={`${baseRoute}/*`} element={<CharactersPage />}>
            <Route path="character/:id" element={<CharacterDetail />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders loading state initially', async () => {
    renderPage();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    );
  });

  it('renders character cards after fetch', async () => {
    renderPage();
    await waitFor(() =>
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    );
  });

  it('displays an error when fetch fails', async () => {
    vi.mocked(api.fetchCharactersPagination).mockRejectedValueOnce(
      new Error('Fetch failed')
    );
    renderPage([`${baseRoute}?page=2&search=Rick`]);

    await waitFor(() =>
      expect(screen.getByText('Fetch failed')).toBeInTheDocument()
    );
  });

  it('handles search input', async () => {
    renderPage();
    await waitFor(() => screen.getByText('Rick Sanchez'));

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Rick' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() =>
      expect(api.fetchCharactersPagination).toHaveBeenCalledWith(
        expect.stringContaining('name=Rick')
      )
    );
  });

  it('displays outlet when character detail route is active', async () => {
    renderPage([`${baseRoute}/character/1`]);
    expect(screen.getByText('Character Detail')).toBeInTheDocument();
  });

  it('handles empty character results', async () => {
    vi.mocked(api.fetchCharactersPagination).mockResolvedValue({
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    });
    renderPage();
    await waitFor(() =>
      expect(screen.getByText(/No characters found/i)).toBeInTheDocument()
    );
  });
});
