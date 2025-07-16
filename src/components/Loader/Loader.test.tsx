import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader component', () => {
  it('renders the spinning loader', () => {
    const { container } = render(<Loader />);
    const spinner = container.querySelector('.animate-spin');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(
      'w-10',
      'h-10',
      'border-4',
      'border-blue-500',
      'border-t-transparent',
      'rounded-full'
    );
  });
});
