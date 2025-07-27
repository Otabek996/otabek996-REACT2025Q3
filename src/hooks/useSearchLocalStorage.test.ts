import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearchLocalStorage } from './useSearchLocalStorage';

const SEARCH_STORAGE_KEY = 'searchValue';

describe('useSearchLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value if localStorage is empty', () => {
    const { result } = renderHook(() => useSearchLocalStorage('default'));
    expect(result.current.searchValue).toBe('default');
  });

  it('should return value from localStorage if it exists', () => {
    localStorage.setItem(SEARCH_STORAGE_KEY, 'storedValue');
    const { result } = renderHook(() => useSearchLocalStorage('default'));
    expect(result.current.searchValue).toBe('storedValue');
  });

  it('should update search value and write to localStorage', () => {
    const { result } = renderHook(() => useSearchLocalStorage(''));

    act(() => {
      result.current.updateSearchValue('newSearch');
    });

    expect(result.current.searchValue).toBe('newSearch');
    expect(localStorage.getItem(SEARCH_STORAGE_KEY)).toBe('newSearch');
  });

  it('should remove item from localStorage when search value is cleared', () => {
    const { result } = renderHook(() => useSearchLocalStorage('initial'));

    act(() => {
      result.current.cleaneSearchValue();
    });

    expect(result.current.searchValue).toBe('');
    expect(localStorage.getItem(SEARCH_STORAGE_KEY)).toBeNull();
  });

  it('should get stored value correctly using getStoredSearchValue()', () => {
    localStorage.setItem(SEARCH_STORAGE_KEY, 'manualValue');
    const { result } = renderHook(() => useSearchLocalStorage());

    expect(result.current.getStoredSearchValue()).toBe('manualValue');
  });

  it('should not update if new value is undefined', () => {
    const { result } = renderHook(() => useSearchLocalStorage('init'));

    act(() => {
      result.current.updateSearchValue(undefined);
    });

    expect(result.current.searchValue).toBe('init');
  });

  it('should handle localStorage read errors gracefully', () => {
    const spy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('read error');
      });

    const { result } = renderHook(() => useSearchLocalStorage('fallback'));

    expect(result.current.searchValue).toBe('fallback');

    spy.mockRestore();
  });

  it('should handle localStorage write errors gracefully', () => {
    const spy = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('write error');
      });

    const { result } = renderHook(() => useSearchLocalStorage(''));

    act(() => {
      result.current.updateSearchValue('failWrite');
    });

    expect(result.current.searchValue).toBe('failWrite');

    spy.mockRestore();
  });
});
