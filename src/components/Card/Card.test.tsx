import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Card from './Card';
import type { Character } from '../../ts/interfaces/interfaces';

const mockNavigate = vi.fn();
const mockUseSearchParams = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => mockUseSearchParams(),
  };
});

const mockCharacter: Character = {
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
};

const mockCharacterOver20: Character = {
  ...mockCharacter,
  id: 25,
  name: 'Armothy',
};

const CardWrapper = ({ character }: { character: Character }) => (
  <BrowserRouter>
    <Card character={character} />
  </BrowserRouter>
);

describe('Card Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders character information correctly', () => {
      const mockSearchParams = new URLSearchParams();
      mockUseSearchParams.mockReturnValue([mockSearchParams]);

      render(<CardWrapper character={mockCharacter} />);

      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Human')).toBeInTheDocument();
      expect(screen.getByText('Alive')).toBeInTheDocument();

      const image = screen.getByAltText('Rick Sanchez');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockCharacter.image);
    });

    it('applies correct CSS classes', () => {
      const mockSearchParams = new URLSearchParams();
      mockUseSearchParams.mockReturnValue([mockSearchParams]);

      render(<CardWrapper character={mockCharacter} />);

      const cardElement = screen.getByRole('img').closest('.card');
      expect(cardElement).toHaveClass(
        'card',
        'bg-[#1E1E1E]',
        'rounded-2xl',
        'm-4',
        'cursor-pointer'
      );
    });

    it('renders image with correct classes', () => {
      const mockSearchParams = new URLSearchParams();
      mockUseSearchParams.mockReturnValue([mockSearchParams]);

      render(<CardWrapper character={mockCharacter} />);

      const image = screen.getByAltText('Rick Sanchez');
      expect(image).toHaveClass('card-img', 'rounded-t-2xl');
    });
  });

  describe('Navigation Logic', () => {
    describe('Character ID <= 20', () => {
      it('navigates with empty search params', () => {
        const mockSearchParams = new URLSearchParams();
        mockSearchParams.toString = vi.fn().mockReturnValue('');
        mockUseSearchParams.mockReturnValue([mockSearchParams]);

        render(<CardWrapper character={mockCharacter} />);

        const cardElement = screen.getByText('Rick Sanchez').closest('.card');
        fireEvent.click(cardElement as Element);

        expect(mockNavigate).toHaveBeenCalledWith('character/1');
      });

      it('navigates with existing search params', () => {
        const mockSearchParams = new URLSearchParams('search=rick&page=2');
        mockSearchParams.toString = vi
          .fn()
          .mockReturnValue('search=rick&page=2');
        mockUseSearchParams.mockReturnValue([mockSearchParams]);

        render(<CardWrapper character={mockCharacter} />);

        const cardElement = screen.getByText('Rick Sanchez').closest('.card');
        fireEvent.click(cardElement as Element);

        expect(mockNavigate).toHaveBeenCalledWith(
          'character/1?search=rick&page=2'
        );
      });

      it('handles character with ID exactly 20', () => {
        const character20 = { ...mockCharacter, id: 20, name: 'Character 20' };
        const mockSearchParams = new URLSearchParams('search=test');
        mockSearchParams.toString = vi.fn().mockReturnValue('search=test');
        mockUseSearchParams.mockReturnValue([mockSearchParams]);

        render(<CardWrapper character={character20} />);

        const cardElement = screen.getByText('Character 20').closest('.card');
        fireEvent.click(cardElement as Element);

        expect(mockNavigate).toHaveBeenCalledWith('character/20?search=test');
      });
    });

    describe('Character ID > 20', () => {
      it('navigates with current page when page param exists', () => {
        const mockSearchParams = new URLSearchParams('search=rick&page=3');
        mockSearchParams.get = vi.fn((key) => {
          if (key === 'page') return '3';
          return null;
        });
        mockSearchParams.has = vi.fn((key) => key === 'page');
        mockSearchParams.toString = vi
          .fn()
          .mockReturnValue('search=rick&page=3');
        mockUseSearchParams.mockReturnValue([mockSearchParams]);

        render(<CardWrapper character={mockCharacterOver20} />);

        const cardElement = screen.getByText('Armothy').closest('.card');
        fireEvent.click(cardElement as Element);

        expect(mockNavigate).toHaveBeenCalledWith(
          'character/25?search=rick&page=3'
        );
      });

      it('adds page param when current page > 1 and page param missing', () => {
        const mockSearchParams = new URLSearchParams('search=rick');
        mockSearchParams.get = vi.fn((key) => {
          if (key === 'page') return null;
          return null;
        });
        mockSearchParams.has = vi.fn(() => false);
        mockSearchParams.set = vi.fn();
        mockSearchParams.toString = vi
          .fn()
          .mockReturnValue('search=rick&page=2');

        mockSearchParams.get = vi.fn((key) => {
          if (key === 'page') return '2';
          return null;
        });

        mockUseSearchParams.mockReturnValue([mockSearchParams]);

        render(<CardWrapper character={mockCharacterOver20} />);

        const cardElement = screen.getByText('Armothy').closest('.card');
        fireEvent.click(cardElement as Element);

        expect(mockNavigate).toHaveBeenCalledWith(
          'character/25?search=rick&page=2'
        );
      });

      it('handles page 1 without adding page param unnecessarily', () => {
        const mockSearchParams = new URLSearchParams('search=rick');
        mockSearchParams.get = vi.fn((key) => {
          if (key === 'page') return '1';
          return null;
        });
        mockSearchParams.has = vi.fn(() => false);
        mockSearchParams.toString = vi.fn().mockReturnValue('search=rick');

        mockUseSearchParams.mockReturnValue([mockSearchParams]);

        render(<CardWrapper character={mockCharacterOver20} />);

        const cardElement = screen.getByText('Armothy').closest('.card');
        fireEvent.click(cardElement as Element);

        expect(mockNavigate).toHaveBeenCalledWith('character/25?search=rick');
      });
    });
  });

  describe('Click Handling', () => {
    it('calls handleOpenCard when card is clicked', () => {
      const mockSearchParams = new URLSearchParams();
      mockUseSearchParams.mockReturnValue([mockSearchParams]);

      render(<CardWrapper character={mockCharacter} />);

      const cardElement = screen.getByText('Rick Sanchez').closest('.card');
      fireEvent.click(cardElement as Element);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('calls handleOpenCard when image is clicked', () => {
      const mockSearchParams = new URLSearchParams();
      mockUseSearchParams.mockReturnValue([mockSearchParams]);

      render(<CardWrapper character={mockCharacter} />);

      const imageElement = screen.getByAltText('Rick Sanchez');
      fireEvent.click(imageElement);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('calls handleOpenCard when text content is clicked', () => {
      const mockSearchParams = new URLSearchParams();
      mockUseSearchParams.mockReturnValue([mockSearchParams]);

      render(<CardWrapper character={mockCharacter} />);

      const nameElement = screen.getByText('Rick Sanchez');
      fireEvent.click(nameElement);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('handles character with special characters in name', () => {
      const specialCharacter = {
        ...mockCharacter,
        name: "Rick & Morty's Adventure",
        species: 'Unknown/Alien',
      };
      const mockSearchParams = new URLSearchParams();
      mockUseSearchParams.mockReturnValue([mockSearchParams]);

      render(<CardWrapper character={specialCharacter} />);

      expect(screen.getByText("Rick & Morty's Adventure")).toBeInTheDocument();
      expect(screen.getByText('Unknown/Alien')).toBeInTheDocument();
    });

    it('handles empty search params correctly', () => {
      const mockSearchParams = new URLSearchParams();
      mockSearchParams.toString = vi.fn().mockReturnValue('');
      mockUseSearchParams.mockReturnValue([mockSearchParams]);

      render(<CardWrapper character={mockCharacter} />);

      const cardElement = screen.getByText('Rick Sanchez').closest('.card');
      fireEvent.click(cardElement as Element);

      expect(mockNavigate).toHaveBeenCalledWith('character/1');
    });

    it('handles undefined page parameter', () => {
      const mockSearchParams = new URLSearchParams();
      mockSearchParams.get = vi.fn().mockReturnValue(null);
      mockSearchParams.toString = vi.fn().mockReturnValue('');
      mockUseSearchParams.mockReturnValue([mockSearchParams]);

      render(<CardWrapper character={mockCharacterOver20} />);

      const cardElement = screen.getByText('Armothy').closest('.card');
      fireEvent.click(cardElement as Element);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
