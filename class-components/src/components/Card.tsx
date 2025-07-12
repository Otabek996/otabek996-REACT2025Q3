import { Component } from 'react';
import type { Character } from '../ts/interfaces/interfaces';

interface Props {
  character: Character;
}

class Card extends Component<Props> {
  render() {
    const { character } = this.props;

    return (
      <div className="card">
        {character.name} - {character.species}
      </div>
    );
  }
}

export default Card;
