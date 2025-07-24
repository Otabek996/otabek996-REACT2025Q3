import type { Character } from '../../ts/interfaces/interfaces';
import { Outlet } from 'react-router-dom';
import Card from '../Card/Card';

interface Props {
  characters: Character[];
}

function CardSection({ characters }: Props) {
  if (characters.length === 0) {
    return <div className="text-center p-4">No characters found.</div>;
  }

  return (
    <section className="flex">
      <div className="card-section grid grid-cols-4 gap-2 p-4">
        {characters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </section>
  );
}

export default CardSection;
