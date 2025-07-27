import { useState, useEffect } from 'react';

const SEARCH_STORAGE_KEY = 'searchValue';

export function useSearchLocalStorage(initialValue: string = '') {
  const [searchValue, setSearchValue] = useState<string>(() => {
    try {
      const storedValue = localStorage.getItem(SEARCH_STORAGE_KEY);
      return storedValue != null ? storedValue : initialValue;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (searchValue) {
        localStorage.setItem(SEARCH_STORAGE_KEY, searchValue);
      } else {
        localStorage.removeItem(SEARCH_STORAGE_KEY);
      }
    } catch (error) {
      console.warn('Failed to write to localStorage:', error);
    }
  }, [searchValue]);

  const updateSearchValue = (newValue: string | undefined) => {
    if (newValue != undefined) {
      setSearchValue(newValue);
    }
  };

  const cleaneSearchValue = () => {
    setSearchValue('');
  };

  const getStoredSearchValue = (): string => {
    try {
      return localStorage.getItem(SEARCH_STORAGE_KEY) || '';
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return '';
    }
  };

  return {
    searchValue,
    updateSearchValue,
    cleaneSearchValue,
    getStoredSearchValue,
  };
}
