import React, { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import { getAlbums } from '../../fetchRoutes/albums';
import { Album } from '../../types/types';
import './albumspage.scss';

export const loader = () => defer({ albums: getAlbums() });

function Albumspage() {
  const { albums } = useLoaderData() as { albums: Promise<Album[]> };

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={albums}
        errorElement={<ErrorMessage />}
      >
        {(albums: Album[]) => (
          <ul className='albums-list'>
            {albums.map((album) => (
              <li key={album.id}>
                <Link
                  to={`${album.id}`}
                  className='albums-list__item'
                >
                  {album.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Await>
    </Suspense>
  );
}

export default Albumspage;
