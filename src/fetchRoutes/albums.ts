import { Album, AlbumPhoto } from '../types/types';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const get = (url, error) => fetch(`${BASE_URL}/${url}`).then(
  r => r.status === 404 ? throw new Error(error) : r.json()
)

export const getUserAlbums = (userId: string): Promise<Album[]> => get(`users/${userId}/albums`, 'cannot find albums');

export const getAlbums = (): Promise<Album[]> => get(`albums`, 'cannot find albums');

export const getAlbum = (id: string): Promise<Album> => get(`albums/${id}`, `cannot find album`);

export const getAlbumPhotos = (id: string): Promise<AlbumPhoto[]> => get(`albums/${id}/photos`, 'cannot get photos');
