import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Hotel from './pages/Hotel/Hotel';
import Checkout from './pages/Checkout/Checkout';
import NotFound from './pages/NotFound/NotFound';
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from './context/CartContext';
import Confirmation from './pages/Confirmation/Confirmation';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
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