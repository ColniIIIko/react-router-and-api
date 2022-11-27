import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { Provider } from 'react-redux';

import Albumpage from './pages/AlbumPage/Albumpage';
import Albumspage from './pages/AlbumsPage/Albumspage';
import Homepage from './pages/Homepage/Homepage';
import Layout from './pages/Layout/Layout';
import Notfoundpage from './pages/NotFoundPage/Notfoundpage';
import Userpage from './pages/UserPage/Userpage';
import Userspage from './pages/UsersPage/Userspage';
import { store } from './redux/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Layout />}
    >
      <Route
        path=''
        element={<Homepage />}
      />
      <Route
        path='users'
        element={<Userspage />}
      />
      <Route
        path='users/:id'
        element={<Userpage />}
      />
      <Route
        path='albums'
        element={<Albumspage />}
      />
      <Route
        path='albums/:id'
        element={<Albumpage />}
      />
      <Route
        path='*'
        element={<Notfoundpage />}
      />
    </Route>
  ),
  { basename: process.env.PUBLIC_URL || '' }
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

