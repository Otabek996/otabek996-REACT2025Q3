import { useEffect, useState } from 'react';
import {
  useSearchParams,
  useLocation,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import SearchSection from '../../components/SearchSection/SearchSection';
import CardSection from '../../components/CardSection/CardSection';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
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
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Check if we're showing character details
  const isShowingDetails = location.pathname.includes('/character/');

  // ... keep all your existing functions (fetchData, updateUrl, handlePageChange, etc.)

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

  const navigateToBaseRoute = (params: URLSearchParams) => {
    const baseRoute = '/otabek996-REACT2025Q3/characters';
    const queryString = params.toString();
    const fullUrl = queryString ? `${baseRoute}?${queryString}` : baseRoute;
    navigate(fullUrl);
  };

  const updateUrl = (pageNumber: number, searchValue?: string) => {
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
    navigateToBaseRoute(newParams);
  };

  const handlePageChange = (pageNumber: number) => {
    updateUrl(pageNumber);
  };

  const handlePrevious = () => {
    if (prevUrl && currentPage > 1) {
      updateUrl(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (nextUrl && currentPage < pages) {
      updateUrl(currentPage + 1);
    }
  };

  const handleSearch = (searchValue: string | undefined) => {
    updateUrl(1, searchValue);

    if (searchValue !== undefined) {
      localStorage.setItem('searchValue', searchValue);
    }
  };

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchValue') || '';
    const searchFromUrl = searchParams.get('search') || savedSearch;
    const pageFromUrl = Math.max(1, currentPage);

    fetchData(searchFromUrl, pageFromUrl);
  }, [searchParams]);

  return (
    <div className="flex">
      <div className={isShowingDetails ? 'flex-1' : 'w-full'}>
        <SearchSection fetchData={handleSearch} />
        {loading && <Loader />}
        {error && <div className="text-red-500 text-center my-4">{error}</div>}
        <CardSection characters={characters} />
        <Pagination
          currentPage={currentPage}
          totalPages={pages}
          onPageChange={handlePageChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasNext={!!nextUrl}
          hasPrevious={!!prevUrl}
          loading={loading}
          showPageInfo={true}
        />
        <ErrorButton />
      </div>

      {isShowingDetails && (
        <div className="w-80 bg-transparent overflow-y-auto">
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default CharactersPage;
