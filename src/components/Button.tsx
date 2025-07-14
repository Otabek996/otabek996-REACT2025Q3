import { Component } from 'react';
import type { ReactNode } from 'react';

interface Props {
  buttonText: string;
  callback: () => void;
  className: string;
}

class Button extends Component<Props> {
  render(): ReactNode {
    return (
      <button
        className={this.props.className}
        type="button"
        onClick={this.props.callback}
      >
        <span>{this.props.buttonText}</span>
      </button>
    );
  }
}

export default Button;
