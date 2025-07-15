import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardSection from './CardSection';
import type { Character } from '../../ts/interfaces/interfaces';

describe('CardSection component', () => {
  const mockCharacters: Character[] = [
    {
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
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: [],
      url: '',
      created: '',
    },
  ];

  it('render a Card for each character', () => {
    render(<CardSection characters={mockCharacters} />);

    const characterOne = screen.getByText('Rick Sanchez');
    const characterTwo = screen.getByText('Morty Smith');

    expect(characterOne).toBeInTheDocument();
    expect(characterTwo).toBeInTheDocument();
  });

  it('shows empty state when no characters are provided', () => {
    render(<CardSection characters={[]} />);

    const emptyState = screen.getByText('No characters found.');
    expect(emptyState).toBeInTheDocument();
  });
});
