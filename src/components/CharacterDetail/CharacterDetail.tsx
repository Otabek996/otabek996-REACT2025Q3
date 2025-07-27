import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Character } from '../../ts/interfaces/interfaces';
import { fetchCharacterById } from '../../api/api';
import Loader from '../Loader/Loader';

function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    navigate('..');
  };

  useEffect(() => {
    if (!id) return;

    fetchCharacterById(id)
      .then(setCharacter)
      .catch((err) => {
        setError(err.message || 'Failed to fetch character');
        setCharacter(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="p-4">
        <Loader />
      </div>
    );
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!character) return <div className="p-4">Character not found</div>;

  return (
    <div className="p-4 bg-transparent">
      <button
        onClick={handleClose}
        className="absolute top-28 right-40 text-xl hover:text-red-500"
      >
        ×
      </button>

      <div className="mt-15">
        <img
          src={character.image}
          alt={character.name}
          className="w-full mb-4"
        />
        <h2 className="text-lg font-semibold">{character.name}</h2>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <p>Origin: {character.origin.name}</p>
        <p>Location: {character.location.name}</p>
      </div>
    </div>
  );
}

export default CharacterDetail;
