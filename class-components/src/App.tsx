import { Component } from 'react';
import CardSection from './components/CardSection';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';
import './App.css';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <CardSection />
        <ErrorButton />
      </ErrorBoundary>
    );
  }
}

export default App;
