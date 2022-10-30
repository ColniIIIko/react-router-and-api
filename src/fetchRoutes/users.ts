import { User } from '../types/types';

export const getUser = async (userId: string): Promise<User> =>
  (await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((r) => {
    if (r.status === 404) throw Error('cannot find user');
    return r.json();
  })) as User;

export const getUsers = async (): Promise<User[]> =>
  (await fetch(`https://jsonplaceholder.typicode.com/users`).then((r) => r.json())) as User[];
