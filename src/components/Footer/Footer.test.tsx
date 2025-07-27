import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the RS School link with correct text and href', () => {
    render(<Footer />);
    const link = screen.getByRole('link', {
      name: /the rolling scopes school/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the logo image', () => {
    render(<Footer />);
    const logo = screen.getByAltText('The Rolling Scopes School Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      'src',
      '/otabek996-REACT2025Q3/the-rolling-scopes-school-logo.svg'
    );
  });

  it('renders the copyright', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} React Course Project`)
    ).toBeInTheDocument();
  });
});
