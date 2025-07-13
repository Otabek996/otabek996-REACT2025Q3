import { Component } from 'react';
import type { Character } from '../ts/interfaces/interfaces';

interface Props {
  character: Character;
}

class Card extends Component<Props> {
  render() {
    const { character } = this.props;

    return (
      <div className="card bg-[#1E1E1E] rounded-2xl m-4">
        <img className="card-img rounded-t-2xl" src={character.image} />
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
}

export default Card;
