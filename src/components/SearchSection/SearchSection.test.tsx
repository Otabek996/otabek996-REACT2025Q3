import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SEARCH_VALUE } from '../../constants/consts';
import SearchSection from './SearchSection';

describe('SearchSection component', () => {
  const setup = () => {
    const fetchDataMock = vi.fn();
    render(<SearchSection fetchData={fetchDataMock} />);
    const input = screen.getByPlaceholderText(
      'Search by name...'
    ) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });
    return { input, button, fetchDataMock };
  };

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders input and button', () => {
    const { input, button } = setup();

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('calls fetchData and saves to localStorage when input has value', () => {
    const { input, button, fetchDataMock } = setup();

    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(button);

    expect(fetchDataMock).toHaveBeenCalledWith('Rick');
    expect(localStorage.getItem(SEARCH_VALUE)).toBe('Rick');
  });

  it('calls fetchData with empty string and removes localStorage when input is empty', () => {
    const { input, button, fetchDataMock } = setup();

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);

    expect(fetchDataMock).toHaveBeenCalledWith('');
    expect(localStorage.getItem(SEARCH_VALUE)).toBeNull();
  });

  it('loads value from localStorage on mount', () => {
    localStorage.setItem(SEARCH_VALUE, 'Morty');
    const fetchDataMock = vi.fn();
    render(<SearchSection fetchData={fetchDataMock} />);
    const input = screen.getByPlaceholderText(
      'Search by name...'
    ) as HTMLInputElement;

    expect(input.value).toBe('Morty');
  });
});
