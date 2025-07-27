import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Routes, Route } from 'react-router-dom';
import CharactersPage from './pages/CharactersPage/CharactersPage';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import PageNotFound from './pages/404/404';
import CharacterDetail from './components/CharacterDetail/CharacterDetail';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const routes = [
    {
      path: '*',
      element: <PageNotFound />,
      children: [],
    },
    {
      path: '/otabek996-REACT2025Q3',
      element: <HomePage />,
      children: [],
    },
    {
      path: '/otabek996-REACT2025Q3/about',
      element: <AboutPage />,
      children: [],
    },
    {
      path: '/otabek996-REACT2025Q3/characters',
      element: <CharactersPage />,
      children: [
        {
          path: 'character/:id',
          element: <CharacterDetail />,
        },
      ],
    },
  ];

  return (
    <ErrorBoundary>
      <Navbar />
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={route.element}>
              {route.children.map((child, indexer) => {
                return (
                  <Route
                    key={indexer}
                    path={child.path}
                    element={child.element}
                  />
                );
              })}
            </Route>
          );
        })}
      </Routes>
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
