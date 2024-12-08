import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.tsx'
import Search from './pages/Search/Search.tsx';
import Hotel from './pages/Hotel/Hotel.tsx';
import Checkout from './pages/Checkout/Checkout.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';

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
    path: '*', 
    element: <NotFound />,
  },
]);

function App() {
  return (
    <><RouterProvider router={router} /></>
  );
}

export default App;
