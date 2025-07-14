import { Component } from 'react';
import type { ReactNode } from 'react';
import Button from './Button';

class ErrorButton extends Component {
  state = { hasError: false };

  render(): ReactNode {
    if (this.state.hasError) {
      throw new Error('This is a fallback UI Error test');
    } else {
      return (
        <Button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          buttonText="Throw&nbsp;Error"
          callback={() => this.setState({ hasError: true })}
        />
      );
    }
  }
}

export default ErrorButton;
