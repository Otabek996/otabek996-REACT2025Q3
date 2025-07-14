import { Component, type ReactNode } from 'react';
import type { Character } from '../ts/interfaces/interfaces';
import Card from './Card';

interface Props {
  results: Character[] | undefined;
}

class ResultsSection extends Component<Props> {
  render(): ReactNode {
    const { results } = this.props;

    if (!results || results.length === 0) {
      return <div className="p-4 text-center">No results found.</div>;
    }

    return (
      <div className="grid grid-cols-2 gap-4 p-4">
        {results.map((char) => (
          <Card key={char.id} character={char} />
        ))}
      </div>
    );
  }
}

export default ResultsSection;
