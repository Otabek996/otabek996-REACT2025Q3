import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from './ErrorButton';

describe('ErrorButton component', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it('renders the button', () => {
    render(<ErrorButton />);

    const errorButton = screen.getByRole('button', { name: /throw/i });
    expect(errorButton).toBeInTheDocument();
  });

  it('throws an error when clicked', () => {
    expect(() => {
      render(<ErrorButton />);

      const button = screen.getByRole('button', { name: /throw/i });
      fireEvent.click(button);
    }).toThrowError('This is a fallback UI Error test');
  });
});
