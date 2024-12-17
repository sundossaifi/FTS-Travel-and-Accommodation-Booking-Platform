import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Hotel from './pages/Hotel/Hotel';
import Checkout from './pages/Checkout/Checkout';
import NotFound from './pages/NotFound/NotFound';
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from './context/CartContext';
import Confirmation from './pages/Confirmation/Confirmation';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/search-results',
    element: <Search />,
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
    path: "/confirmation/:bookingId",
    element: <Confirmation />
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return (
    <SearchProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </SearchProvider>
  )

}

export default App;