import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Character } from '../../ts/interfaces/interfaces';
import Card from './Card';

describe('Card component', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '',
  };

  it('render character image', () => {
    render(<Card character={mockCharacter} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockCharacter.image);
  });

  it('display character name, species and status', () => {
    render(<Card character={mockCharacter} />);

    const name = screen.getByText(mockCharacter.name);
    const species = screen.getByText(mockCharacter.species);
    const status = screen.getByText(mockCharacter.status);

    expect(name).toBeInTheDocument();
    expect(species).toBeInTheDocument();
    expect(status).toBeInTheDocument();
  });
});
