import { Album, AlbumPhoto } from '../types/types';

export const getUserAlbums = async (userId: string): Promise<Album[]> =>
  (await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`).then((r) => {
    if (r.status === 404) throw Error('cannot find albums');
    return r.json();
  })) as Album[];

export const getAlbums = async () =>
  (await fetch(`https://jsonplaceholder.typicode.com/albums`).then((r) => r.json())) as Album[];

export const getAlbum = async (albumId: string): Promise<Album> =>
  (await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`).then((r) => {
    if (r.status === 404) throw Error('cannot find album');
    return r.json();
  })) as Album;

export const getAlbumPhotos = async (albumId: string): Promise<AlbumPhoto[]> =>
  (await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`).then((r) => {
    if (r.status === 404) throw Error('cannot find album');
    return r.json();
  })) as AlbumPhoto[];

export const getPhotos = async () =>
  (await fetch(`https://jsonplaceholder.typicode.com/photos`).then((r) =>
    r.json()
  )) as AlbumPhoto[];
