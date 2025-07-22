import { useEffect, useState } from 'react';
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
  const [nextUrl, setNextUrl] = useState<string | null>('');
  const [prevUrl, setPrevUrl] = useState<string | null>('');
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [baseUrl, setBaseUrl] = useState<string>('');

  const fetchData = async (searchValue: string | undefined) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCharacters(searchValue);
      setCharacters(data.results);
      setNextUrl(data.info.next);
      setPrevUrl(data.info.prev);
      setPages(data.info.pages);
      setCurrentPage(1);
      const url = import.meta.env.VITE_RICK_AND_MORTY_BASE_URL;
      setBaseUrl(
        searchValue
          ? `${url}/character?name=${searchValue}`
          : `${url}/character`
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setCharacters([]);
      setError(message);
      setNextUrl(null);
      setPrevUrl(null);
      setPages(0);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = async (url: string, pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCharactersPagination(url);
      setCharacters(data.results);
      setNextUrl(data.info.next);
      setPrevUrl(data.info.prev);
      setPages(data.info.pages);
      setCurrentPage(pageNum);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevClick = () => {
    if (prevUrl) handlePagination(prevUrl, currentPage - 1);
  };

  const handleNextClick = () => {
    if (nextUrl) handlePagination(nextUrl, currentPage + 1);
  };

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber != currentPage) {
      const pageUrl = baseUrl.includes('?')
        ? `${baseUrl}$page=${pageNumber}`
        : `${baseUrl}?page=${pageNumber}`;

      handlePagination(pageUrl, pageNumber);
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
    fetchData(savedSearch);
  }, []);

  const pageNumbers = generatePageNumbers();

  return (
    <>
      <SearchSection fetchData={fetchData} />
      {loading && <Loader />}
      {error && <div className="text-red-500 text-center">{error}</div>}
      <CardSection characters={characters} />

      {pages > 1 && (
        <div className="flex justify-center gap-2 my-6">
          <button
            type="button"
            onClick={handlePrevClick}
            disabled={!prevUrl || loading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            Prev
          </button>

          {pageNumbers.map((pageNum, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                typeof pageNum == 'number'
                  ? handlePageClick(pageNum)
                  : undefined
              }
              disabled={loading || pageNum === '...'}
              className={`px-3 py-2 rounded transition-colors ${
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
            disabled={!nextUrl || loading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      )}

      {pages > 1 && (
        <div className="text-center text-white mb-4">
          Page {currentPage} of {pages}
        </div>
      )}

      <ErrorButton />
    </>
  );
}

export default CharactersPage;
