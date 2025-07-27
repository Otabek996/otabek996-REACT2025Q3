import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const routes = ['/otabek996-REACT2025Q3', '/otabek996-REACT2025Q3/characters'];

const renderWithRoute = (initialRoute: string) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
};

describe('App routing', () => {
  it(`renders HomePage at ${routes[0]}`, () => {
    renderWithRoute(routes[0]);
    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });

  it(`renders CharactersPage at ${routes[1]}`, () => {
    renderWithRoute(routes[1]);
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  it('renders 404 page for unknown routes', () => {
    renderWithRoute('/some/unknown/path');
    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
  });
});
