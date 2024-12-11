import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Hotel from './pages/Hotel/Hotel';
import Checkout from './pages/Checkout/Checkout';
import NotFound from './pages/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/search-results',
    element: <SearchWrapper />,
  },
  {
    path: '/hotel/:id',
    element: <Hotel />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function SearchWrapper() {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  return <Search results={results} key={location.key} />;
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;