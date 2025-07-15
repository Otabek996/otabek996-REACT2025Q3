import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Component, type ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

class ErrorChild extends Component {
  render(): ReactNode {
    throw new Error('Test error');

    return '';
  }
}

describe('ErrorBoundary component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>There is no error</div>
      </ErrorBoundary>
    );

    const noError = screen.getByText('There is no error');
    expect(noError).toBeInTheDocument();
  });

  it('displays fallback UI when child throws error', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorChild />
      </ErrorBoundary>
    );

    const yesError = screen.getByText(
      'Something went wrong, please reload the page.'
    );
    expect(yesError).toBeInTheDocument();

    errorSpy.mockRestore();
  });
});
