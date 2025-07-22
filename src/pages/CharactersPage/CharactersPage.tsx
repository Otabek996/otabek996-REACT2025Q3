import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchSection from '../../components/SearchSection/SearchSection';
import CardSection from '../../components/CardSection/CardSection';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import Loader from '../../components/Loader/Loader';
import { fetchCharacters, fetchCharactersPagination } from '../../api/api';
import { type Character } from '../../ts/interfaces/interfaces';

function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [pages, setPages] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const fetchData = async (
    searchValue: string | undefined,
    page: number = 1
  ) => {
    try {
      setLoading(true);
      setError(null);

      let data;
      const apiBaseUrl = import.meta.env.VITE_RICK_AND_MORTY_BASE_URL;

      if (page === 1 && !searchValue) {
        data = await fetchCharacters(searchValue);
      } else {
        let url = `${apiBaseUrl}/character`;
        const params = new URLSearchParams();

        if (searchValue) params.append('name', searchValue);
        if (page > 1) params.append('page', page.toString());

        if (params.toString()) url += `?${params.toString()}`;

        data = await fetchCharactersPagination(url);
      }

      setCharacters(data.results);
      setNextUrl(data.info.next);
      setPrevUrl(data.info.prev);
      setPages(data.info.pages);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setCharacters([]);
      setError(message);
      setNextUrl(null);
      setPrevUrl(null);
      setPages(0);
    } finally {
      setLoading(false);
    }
  };

  const updateUrlAndFetch = (pageNumber: number, searchValue?: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (pageNumber === 1) {
      newParams.delete('page');
    } else {
      newParams.set('page', pageNumber.toString());
    }

    if (searchValue !== undefined) {
      if (searchValue) {
        newParams.set('search', searchValue);
      } else {
        newParams.delete('search');
      }
    }

    setSearchParams(newParams);
  };

  const handlePrevClick = () => {
    if (prevUrl && currentPage > 1) {
      const newPage = currentPage - 1;
      updateUrlAndFetch(newPage);
    }
  };

  const handleNextClick = () => {
    if (nextUrl && currentPage < pages) {
      const newPage = currentPage + 1;
      updateUrlAndFetch(newPage);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage && pageNumber >= 1 && pageNumber <= pages) {
      updateUrlAndFetch(pageNumber);
    }
  };

  const handleSearchWithPagination = (searchValue: string | undefined) => {
    updateUrlAndFetch(1, searchValue);

    if (searchValue !== undefined) {
      localStorage.setItem('searchValue', searchValue);
    }
  };

  const generatePageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    range.push(1);

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(pages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (pages > 1) {
      range.push(pages);
    }

    const uniqueRange = [...new Set(range)].sort((a, b) => a - b);

    for (let i = 0; i < uniqueRange.length; i++) {
      if (i === 0) {
        rangeWithDots.push(uniqueRange[i]);
      } else if (uniqueRange[i] - uniqueRange[i - 1] === 2) {
        rangeWithDots.push(uniqueRange[i - 1] + 1);
        rangeWithDots.push(uniqueRange[i]);
      } else if (uniqueRange[i] - uniqueRange[i - 1] !== 1) {
        rangeWithDots.push('...');
        rangeWithDots.push(uniqueRange[i]);
      } else {
        rangeWithDots.push(uniqueRange[i]);
      }
    }

    return rangeWithDots;
  };

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchValue') || '';
    const searchFromUrl = searchParams.get('search') || savedSearch;

    const pageFromUrl = Math.max(1, currentPage);

    fetchData(searchFromUrl, pageFromUrl);
  }, [searchParams]);

  const pageNumbers = generatePageNumbers();

  return (
    <>
      <SearchSection fetchData={handleSearchWithPagination} />
      {loading && <Loader />}
      {error && <div className="text-red-500 text-center">{error}</div>}
      <CardSection characters={characters} />

      {pages > 1 && (
        <div className="flex justify-center items-center gap-2 my-6">
          <button
            type="button"
            onClick={handlePrevClick}
            disabled={currentPage === 1 || loading}
            className="px-3 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            Prev
          </button>

          {pageNumbers.map((pageNum, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                typeof pageNum === 'number'
                  ? handlePageClick(pageNum)
                  : undefined
              }
              disabled={loading || pageNum === '...'}
              className={`px-3 py-2 rounded transition-colors min-w-[40px] ${
                pageNum === currentPage
                  ? 'bg-blue-600 text-white font-bold'
                  : pageNum === '...'
                    ? 'bg-transparent text-gray-500 cursor-default'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } ${loading ? 'cursor-not-allowed' : ''}`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            onClick={handleNextClick}
            disabled={currentPage === pages || loading}
            className="px-3 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {pages > 1 && (
        <div className="text-center text-gray-600 mb-4">
          Page {currentPage} of {pages}
        </div>
      )}

      <ErrorButton />
    </>
  );
}

export default CharactersPage;
