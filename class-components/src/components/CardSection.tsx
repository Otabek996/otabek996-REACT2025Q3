import { Component } from 'react';
import type { StateCharacter } from '../ts/interfaces/interfaces';
import { fetchCharacters } from '../api/api';
import Card from './Card';

class CardSection extends Component<object, StateCharacter> {
  constructor(props: object) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      characters: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const data = await fetchCharacters();
      this.setState({ characters: data.results, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setState({ error: error.message, loading: false });
      } else {
        this.setState({ error: 'Unknown error', loading: false });
      }
    }
  }

  render() {
    const { loading, error, characters } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (characters.length === 0) {
      return <div>No Characters found</div>;
    }

    return (
      <section className="card-section">
        {characters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </section>
    );
  }
}

export default CardSection;
