import React, { Suspense } from 'react';
import { Await, useLoaderData, LoaderFunction, Link, defer } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { getUserAlbums } from '../../fetchRoutes/albums';
import { getUser } from '../../fetchRoutes/users';
import { UserFull } from '../../types/types';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './userpage.scss';

export const loader: LoaderFunction = ({ params: { id } }) => {
  const userPromise = new Promise(async (res, rej) => {
    try {
      const user = await getUser(id || '');
      const albums = await getUserAlbums(id || '');
      res({ user, albums });
    } catch (e) {
      rej((e as Error).message);
    }
  });

  return defer({ userPromise });
};

function Userpage() {
  const { userPromise } = useLoaderData() as {
    userPromise: Promise<UserFull>;
  };
  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={userPromise}
        errorElement={<ErrorMessage />}
      >
        {(userObj: UserFull) => (
          <div className='user'>
            <div className='user-info'>
              <h3 className='user-info__name'>{userObj.user.name}</h3>
              <p className='user-info__surname user-info__sub'>Username: {userObj.user.username}</p>
              <p className='user-info__email user-info__sub'>
                Email: <a href={`mailto:${userObj.user.email}`}>{userObj.user.email} </a>
              </p>
              <p className='user-info__phone user-info__sub'>Phone: {userObj.user.phone}</p>
              <p className='user-info__website user-info__sub'>
                Site:{' '}
                <a
                  href={`http://${userObj.user.website}`}
                  target='blank'
                >
                  {userObj.user.website}
                </a>
              </p>
            </div>
            <div>
              <h4>{`${/^.* /.exec(userObj.user.name)}'s albums:`}</h4>
              <ul className='user-albums'>
                {userObj.albums.map((album) => (
                  <li
                    key={album.id}
                    className='user-albums__item'
                  >
                    <Link to={`/albums/${album.id}`}>{album.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
}

export default Userpage;
