import React, { Suspense } from 'react';
import { Await, defer, LoaderFunction, useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import { getAlbum, getAlbumPhotos } from '../../fetchRoutes/albums';
import { getUser } from '../../fetchRoutes/users';
import { AlbumFull } from '../../types/types';
import './albumpage.scss';

export const loader: LoaderFunction = async ({ params: { id } }) => {
  const albumPromise = new Promise(async (res, rej) => {
    try {
      const album = await getAlbum(id || '');
      const photos = await getAlbumPhotos(id || '');
      const user = await getUser(album.userId.toString() || '');
      res({ user, album, photos });
    } catch (e) {
      rej((e as Error).message);
    }
  });

  return defer({ albumPromise });
};

function Albumpage() {
  const { albumPromise } = useLoaderData() as { albumPromise: Promise<AlbumFull> };
  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={albumPromise}
        errorElement={<ErrorMessage />}
      >
        {(albumObj: AlbumFull) => (
          <div className='album'>
            <h3 className='album__title'>{albumObj.album.title}</h3>
            <p className='album__creator'>
              Creator: <Link to={`/users/${albumObj.user.id}`}>{albumObj.user.name}</Link>
            </p>
            <div className='album__photos'>
              {albumObj.photos.map((photo) => (
                <div key={photo.id}>
                  <img
                    alt={photo.title}
                    src={photo.thumbnailUrl}
                  ></img>
                </div>
              ))}
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
}

export default Albumpage;
