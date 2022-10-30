import React, { Suspense } from 'react';
import { defer, Await, useLoaderData, LoaderFunction, Link } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import { getUsers } from '../../fetchRoutes/users';
import { User } from '../../types/types';
import './userpage.scss';

export const loader: LoaderFunction = () => defer({ users: getUsers() });

function Userspage() {
  const { users } = useLoaderData() as { users: Promise<User[]> };
  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={users}
        errorElement={<ErrorMessage />}
      >
        {(users: User[]) => (
          <ul className='users-list'>
            {users.map((user) => (
              <li key={user.id}>
                <Link
                  className='users-list__item'
                  key={user.id}
                  to={`${user.id}`}
                >
                  {user.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Await>
    </Suspense>
  );
}

export default Userspage;
