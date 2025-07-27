import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';
import { describe, it, expect } from 'vitest';

describe('AboutPage', () => {
  it('renders heading and author info', () => {
    render(<AboutPage />);

    expect(
      screen.getByRole('heading', { name: /this is about page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/application author - it is me/i)
    ).toBeInTheDocument();
  });

  it('renders GitHub link with correct href', () => {
    render(<AboutPage />);
    const githubLink = screen.getByRole('link', { name: /otabek/i });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Otabek996');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('renders RS School link', () => {
    render(<AboutPage />);
    const rsLink = screen.getByRole('link', {
      name: /the rolling scopes school/i,
    });

    expect(rsLink).toBeInTheDocument();
    expect(rsLink).toHaveAttribute('href', 'https://rs.school');
  });

  it('renders React Course link', () => {
    render(<AboutPage />);
    const reactCourseLink = screen.getByRole('link', { name: /react course/i });

    expect(reactCourseLink).toBeInTheDocument();
    expect(reactCourseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });

  it('does not show RS badge (display: none)', () => {
    render(<AboutPage />);
    const badges = screen.getAllByText('RS');

    badges.forEach((badge) => {
      expect(badge).toHaveStyle({ display: 'none' });
    });
  });
});
