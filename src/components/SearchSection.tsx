import { Component, createRef, type ReactNode } from 'react';
import { SEARCH_VALUE } from '../constants/consts';
import Button from './Button/Button';

interface Props {
  fetchData: (value: string | undefined) => void;
}

class SearchSection extends Component<Props> {
  inputRef = createRef<HTMLInputElement>();

  handleClick = () => {
    const value = this.inputRef.current?.value.trim();

    if (value) {
      localStorage.setItem(SEARCH_VALUE, value);
    } else {
      localStorage.removeItem(SEARCH_VALUE);
    }

    this.props.fetchData(value);
  };

  componentDidMount(): void {
    const savedValue = localStorage.getItem(SEARCH_VALUE);

    if (savedValue && this.inputRef.current) {
      this.inputRef.current.value = savedValue;
    }
  }

  render(): ReactNode {
    return (
      <section className="flex items-center gap-4 p-4">
        <input
          type="text"
          ref={this.inputRef}
          className="border border-gray-400 px-3 py-2 rounded w-full"
          placeholder="Search by name..."
        />
        <Button
          buttonText="Search"
          callback={this.handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        />
      </section>
    );
  }
}

export default SearchSection;
