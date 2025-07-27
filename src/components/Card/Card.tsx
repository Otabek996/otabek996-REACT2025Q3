import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Character } from '../../ts/interfaces/interfaces';

interface Props {
  character: Character;
}

function Card({ character }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleOpenCard = () => {
    const currentParams = searchParams.toString();
    const separator = currentParams ? '?' : '';

    if (character.id <= 20) {
      navigate(`character/${character.id}${separator}${currentParams}`);
    } else {
      const currentPage = parseInt(searchParams.get('page') || '1', 10);
      const newParams = new URLSearchParams(searchParams);
      if (!newParams.has('page') && currentPage > 1) {
        newParams.set('page', currentPage.toString());
      }
      navigate(`character/${character.id}?${newParams.toString()}`);
    }
  };

  return (
    <div
      className="card bg-[#1E1E1E] rounded-2xl m-4 cursor-pointer"
      onClick={handleOpenCard}
    >
      <img
        className="card-img rounded-t-2xl"
        src={character.image}
        alt={character.name}
      />
      <div className="p-3">
        <h2 className="card-name text-xl font-medium">{character.name}</h2>
        <h6 className="card-species text-base font-normal text-[#ffffffb3]">
          {character.species}
        </h6>
        <p className="card-status">{character.status}</p>
      </div>
    </div>
  );
}

export default Card;
