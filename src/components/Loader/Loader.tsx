import { Component } from 'react';
import type { ReactNode } from 'react';

class Loader extends Component {
  render(): ReactNode {
    return (
      <div
        className="flex justify-center items-center py-8"
        data-testid="loader"
      >
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
}

export default Loader;
