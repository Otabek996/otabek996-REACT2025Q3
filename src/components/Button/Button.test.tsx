import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('renders the button with provided text', () => {
    render(
      <Button
        buttonText="Click me"
        callback={() => {}}
        className="test-button"
      />
    );

    const buttonText = screen.getByText('Click me');
    expect(buttonText).toBeInTheDocument();
  });

  it('applies the correct className', () => {
    render(
      <Button
        buttonText="Submit"
        callback={() => {}}
        className="my-custom-class"
      />
    );

    const className = screen.getByRole('button');
    expect(className).toHaveClass('my-custom-class');
  });

  it('calls the callback when clicked', () => {
    const mockCallBack = vi.fn();

    render(
      <Button buttonText="Press" callback={mockCallBack} className="btn" />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});
