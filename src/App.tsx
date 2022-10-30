import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Albumpage, { loader as albumLoader } from './pages/AlbumPage/Albumpage';
import Albumspage, { loader as albumsLoader } from './pages/AlbumsPage/Albumspage';
import Homepage from './pages/Homepage/Homepage';
import Layout from './pages/Layout/Layout';
import Notfoundpage from './pages/NotFoundPage/Notfoundpage';
import Userpage, { loader as userLoader } from './pages/UserPage/Userpage';
import Userspage, { loader as usersLoader } from './pages/UsersPage/Userspage';

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
        loader={usersLoader}
      />
      <Route
        path='users/:id'
        element={<Userpage />}
        loader={userLoader}
      />
      <Route
        path='albums'
        element={<Albumspage />}
        loader={albumsLoader}
      />
      <Route
        path='albums/:id'
        element={<Albumpage />}
        loader={albumLoader}
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
  return <RouterProvider router={router} />;
}

export default App;

