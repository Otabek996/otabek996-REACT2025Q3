import { useRef, useEffect } from 'react';
import { SEARCH_VALUE } from '../../constants/consts';
import Button from '../Button/Button';

interface Props {
  fetchData: (value: string | undefined) => void;
}

function SearchSection({ fetchData }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const value = inputRef.current?.value.trim();

    if (value) {
      localStorage.setItem(SEARCH_VALUE, value);
    } else {
      localStorage.removeItem(SEARCH_VALUE);
    }

    fetchData(value);
  };

  useEffect(() => {
    const savedValue = localStorage.getItem(SEARCH_VALUE);
    if (savedValue && inputRef.current) {
      inputRef.current.value = savedValue;
    }
  }, []);

  return (
    <section className="flex items-center gap-4 p-4">
      <input
        type="text"
        ref={inputRef}
        className="border border-gray-400 px-3 py-2 rounded w-full"
        placeholder="Search by name..."
      />
      <Button
        buttonText="Search"
        callback={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      />
    </section>
  );
}

export default SearchSection;
