import { Component } from 'react';
import SearchSection from './components/SearchSection';
import CardSection from './components/CardSection/CardSection';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorButton from './components/ErrorButton/ErrorButton';
import Loader from './components/Loader/Loader';
import { fetchCharacters } from './api/api';
import { type Character } from './ts/interfaces/interfaces';
import './App.css';

interface State {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

class App extends Component<object, State> {
  state: State = {
    characters: [],
    loading: false,
    error: null,
  };

  fetchData = async (searchValue: string | undefined) => {
    try {
      this.setState({ loading: true, error: null });
      const data = await fetchCharacters(searchValue);
      this.setState({ characters: data.results });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.setState({ characters: [], error: message });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount(): void {
    const savedSearch = localStorage.getItem('searchValue') || '';
    this.fetchData(savedSearch);
  }

  render() {
    const { characters, loading, error } = this.state;

    return (
      <ErrorBoundary>
        <SearchSection fetchData={this.fetchData} />
        {loading && <Loader />}
        {error && <div className="text-red-500 text-center">{error}</div>}
        <CardSection characters={characters} />
        <ErrorButton />
      </ErrorBoundary>
    );
  }
}

export default App;
