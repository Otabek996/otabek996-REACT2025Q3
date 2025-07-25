// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import type { Character } from '../../ts/interfaces/interfaces';
// import { fetchCharacterById } from '../../api/api';
// import Loader from '../Loader/Loader';

interface Props {
  characterId: number;
}

function CharacterDetail({ characterId }: Props) {
  // const { id } = useParams<{ id: string }>();
  // const [character, setCharacter] = useState<Character | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (!id) return;

  //   data = await fetchCharacterById(id)
  //     .then(setCharacter)
  //     .catch((err) => {
  //       setError(err.message || 'Failed to fetch character');
  //       setCharacter(null);
  //     })
  //     .finally(() => setLoading(false));
  // }, [id]);

  // const fetchDataCharacter = async ()

  // if (loading) return <Loader />;
  // if (error) return <div className="text-red-500">Error: {error}</div>;
  // if (!character) return <div>Character not found</div>;

  return <h1>Character Details {characterId}</h1>;
}

export default CharacterDetail;
