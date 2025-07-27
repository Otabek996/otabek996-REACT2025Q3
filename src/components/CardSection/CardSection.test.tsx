import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CardSection from './CardSection';
import type { Character } from '../../ts/interfaces/interfaces';

vi.mock('../Card/Card', () => ({
  default: ({ character }: { character: Character }) => (
    <div data-testid={`card-${character.id}`} className="mock-card">
      <span>{character.name}</span>
      <span>{character.species}</span>
      <span>{character.status}</span>
    </div>
  ),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useSearchParams: () => [new URLSearchParams()],
  };
});

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'unknown',
      url: '',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/2',
    created: '2017-11-04T18:50:21.651Z',
  },
  {
    id: 3,
    name: 'Summer Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Female',
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/6'],
    url: 'https://rickandmortyapi.com/api/character/3',
    created: '2017-11-04T19:09:56.428Z',
  },
];

const CardSectionWrapper = ({ characters }: { characters: Character[] }) => (
  <BrowserRouter>
    <CardSection characters={characters} />
  </BrowserRouter>
);

describe('CardSection Component', () => {
  describe('Rendering with Characters', () => {
    it('renders section with correct structure when characters are provided', () => {
      render(<CardSectionWrapper characters={mockCharacters} />);

      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('flex');

      const cardSectionDiv = section?.querySelector('.card-section');
      expect(cardSectionDiv).toBeInTheDocument();
      expect(cardSectionDiv).toHaveClass('grid', 'grid-cols-4', 'gap-2', 'p-4');
    });

    it('renders all characters as Card components', () => {
      render(<CardSectionWrapper characters={mockCharacters} />);

      expect(screen.getByTestId('card-1')).toBeInTheDocument();
      expect(screen.getByTestId('card-2')).toBeInTheDocument();
      expect(screen.getByTestId('card-3')).toBeInTheDocument();

      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
      expect(screen.getByText('Summer Smith')).toBeInTheDocument();
    });

    it('passes correct character props to Card components', () => {
      render(<CardSectionWrapper characters={mockCharacters} />);

      const rickCard = screen.getByTestId('card-1');
      expect(rickCard).toHaveTextContent('Rick Sanchez');
      expect(rickCard).toHaveTextContent('Human');
      expect(rickCard).toHaveTextContent('Alive');

      const mortyCard = screen.getByTestId('card-2');
      expect(mortyCard).toHaveTextContent('Morty Smith');
      expect(mortyCard).toHaveTextContent('Human');
      expect(mortyCard).toHaveTextContent('Alive');

      const summerCard = screen.getByTestId('card-3');
      expect(summerCard).toHaveTextContent('Summer Smith');
      expect(summerCard).toHaveTextContent('Human');
      expect(summerCard).toHaveTextContent('Alive');
    });

    it('uses character.id as key for each Card component', () => {
      render(<CardSectionWrapper characters={mockCharacters} />);

      mockCharacters.forEach((character) => {
        expect(screen.getByTestId(`card-${character.id}`)).toBeInTheDocument();
      });
    });
  });

  describe('Empty State', () => {
    it('renders empty state message when no characters provided', () => {
      render(<CardSectionWrapper characters={[]} />);

      expect(screen.getByText('No characters found.')).toBeInTheDocument();
      expect(screen.queryByRole('region')).not.toBeInTheDocument();
      expect(screen.queryByTestId(/card-/)).not.toBeInTheDocument();
    });

    it('applies correct classes to empty state', () => {
      render(<CardSectionWrapper characters={[]} />);

      const emptyStateDiv = screen.getByText('No characters found.');
      expect(emptyStateDiv).toHaveClass('text-center', 'p-4');
    });

    it('does not render grid structure when empty', () => {
      render(<CardSectionWrapper characters={[]} />);

      expect(screen.queryByRole('region')).not.toBeInTheDocument();
      expect(document.querySelector('.card-section')).not.toBeInTheDocument();
      expect(document.querySelector('.grid')).not.toBeInTheDocument();
    });
  });

  describe('Single Character', () => {
    it('renders correctly with single character', () => {
      const singleCharacter = [mockCharacters[0]];
      render(<CardSectionWrapper characters={singleCharacter} />);

      expect(document.querySelector('section')).toBeInTheDocument();
      expect(screen.getByTestId('card-1')).toBeInTheDocument();
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();

      const cardSectionDiv = document.querySelector('.card-section');
      expect(cardSectionDiv).toHaveClass('grid', 'grid-cols-4', 'gap-2', 'p-4');
    });
  });

  describe('Large Dataset', () => {
    it('handles large number of characters', () => {
      const manyCharacters: Character[] = Array.from(
        { length: 20 },
        (_, index) => ({
          ...mockCharacters[0],
          id: index + 1,
          name: `Character ${index + 1}`,
        })
      );

      render(<CardSectionWrapper characters={manyCharacters} />);

      expect(document.querySelector('section')).toBeInTheDocument();

      manyCharacters.forEach((character) => {
        expect(screen.getByTestId(`card-${character.id}`)).toBeInTheDocument();
        expect(screen.getByText(character.name)).toBeInTheDocument();
      });
    });
  });

  describe('Character Data Variations', () => {
    it('handles characters with different species', () => {
      const diverseCharacters: Character[] = [
        { ...mockCharacters[0], species: 'Human' },
        { ...mockCharacters[1], id: 2, species: 'Alien' },
        { ...mockCharacters[2], id: 3, species: 'Robot' },
      ];

      render(<CardSectionWrapper characters={diverseCharacters} />);

      expect(screen.getByText('Human')).toBeInTheDocument();
      expect(screen.getByText('Alien')).toBeInTheDocument();
      expect(screen.getByText('Robot')).toBeInTheDocument();
    });

    it('handles characters with different statuses', () => {
      const statusVariedCharacters: Character[] = [
        { ...mockCharacters[0], status: 'Alive' },
        { ...mockCharacters[1], id: 2, status: 'Dead' },
        { ...mockCharacters[2], id: 3, status: 'unknown' },
      ];

      render(<CardSectionWrapper characters={statusVariedCharacters} />);

      expect(screen.getByText('Alive')).toBeInTheDocument();
      expect(screen.getByText('Dead')).toBeInTheDocument();
      expect(screen.getByText('unknown')).toBeInTheDocument();
    });

    it('handles characters with special characters in names', () => {
      const specialCharacters: Character[] = [
        { ...mockCharacters[0], name: "Rick & Morty's Adventure" },
        { ...mockCharacters[1], id: 2, name: 'Character-Name_123' },
        { ...mockCharacters[2], id: 3, name: 'Multi Word Character Name' },
      ];

      render(<CardSectionWrapper characters={specialCharacters} />);

      expect(screen.getByText("Rick & Morty's Adventure")).toBeInTheDocument();
      expect(screen.getByText('Character-Name_123')).toBeInTheDocument();
      expect(screen.getByText('Multi Word Character Name')).toBeInTheDocument();
    });
  });

  describe('CSS Classes and Structure', () => {
    it('applies correct CSS classes to main section', () => {
      render(<CardSectionWrapper characters={mockCharacters} />);

      const section = document.querySelector('section');
      expect(section).toHaveClass('flex');
    });

    it('applies correct CSS classes to card container', () => {
      render(<CardSectionWrapper characters={mockCharacters} />);

      const cardContainer = document.querySelector('.card-section');
      expect(cardContainer).toHaveClass('grid', 'grid-cols-4', 'gap-2', 'p-4');
    });

    it('maintains proper DOM structure', () => {
      render(<CardSectionWrapper characters={mockCharacters} />);

      const section = document.querySelector('section');
      const cardContainer = section?.querySelector('.card-section');

      expect(cardContainer).toBeInTheDocument();
      expect(cardContainer?.children).toHaveLength(mockCharacters.length);
    });
  });

  describe('Accessibility', () => {
    it('uses semantic section element', () => {
      render(<CardSectionWrapper characters={mockCharacters} />);

      expect(document.querySelector('section')).toBeInTheDocument();
    });

    it('maintains accessibility when empty', () => {
      render(<CardSectionWrapper characters={[]} />);

      const emptyMessage = screen.getByText('No characters found.');
      expect(emptyMessage).toBeInTheDocument();
      expect(emptyMessage.tagName).toBe('DIV');
    });
  });
});
