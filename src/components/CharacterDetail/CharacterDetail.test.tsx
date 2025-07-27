import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterDetail from './CharacterDetail';
import * as api from '../../api/api';
import userEvent from '@testing-library/user-event';
import type { Character } from '../../ts/interfaces/interfaces';

vi.mock('../../api/api');

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: 'rick.png',
  episode: [],
  url: '',
  created: '',
};

describe('CharacterDetail', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders loader while fetching data', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockImplementation(
      () =>
        new Promise(() => {
          /*  */
        })
    );

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders character data after fetch', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toHaveTextContent('Status: Alive');
    expect(screen.getByText(/species/i)).toHaveTextContent('Species: Human');
    expect(screen.getByRole('img')).toHaveAttribute('src', 'rick.png');
  });

  it('shows error message if fetch fails', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockRejectedValue(
      new Error('Fetch failed')
    );

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/error/i)).toHaveTextContent(
      'Error: Fetch failed'
    );
  });

  it('renders fallback if character is not found', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockResolvedValue(null as never);

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/character not found/i)).toBeInTheDocument();
  });

  it('navigates back when close button is clicked', async () => {
    vi.spyOn(api, 'fetchCharacterById').mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText('Rick Sanchez');
    const closeButton = screen.getByRole('button', { name: /×/ });
    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  });
});
