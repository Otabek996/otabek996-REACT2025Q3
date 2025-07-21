import { useEffect, useState } from 'react';
import SearchSection from '../../components/SearchSection/SearchSection';
import CardSection from '../../components/CardSection/CardSection';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import Loader from '../../components/Loader/Loader';
import { fetchCharacters } from '../../api/api';
import { type Character } from '../../ts/interfaces/interfaces';

function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (searchValue: string | undefined) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCharacters(searchValue);
      setCharacters(data.results);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setCharacters([]);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  console.log(fetchData);

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchValue') || '';
    fetchData(savedSearch);
  }, []);

  return (
    <>
      <SearchSection fetchData={fetchData} />
      {loading && <Loader />}
      {error && <div className="text-red-500 text-center">{error}</div>}
      <CardSection characters={characters} />
      <ErrorButton />
    </>
  );
}

export default CharactersPage;
