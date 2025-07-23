import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Routes, Route } from 'react-router-dom';
import CharactersPage from './pages/CharactersPage/CharactersPage';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const routes = [
    {
      path: '*',
      element: <h1>404 - Page Not Found</h1>,
    },
    {
      path: '/otabek996-REACT2025Q3',
      element: <HomePage />,
    },
    {
      path: '/otabek996-REACT2025Q3/characters',
      element: <CharactersPage />,
    },
    {
      path: '/otabek996-REACT2025Q3/about',
      element: <AboutPage />,
    },
  ];

  return (
    <ErrorBoundary>
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
