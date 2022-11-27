import { Dispatch } from 'redux';
import { getAlbums } from '../../fetchRoutes/albums';
import { AlbumActions } from './reducer';

export const fetchAlbums = () => {
  return async (dispatch: Dispatch<AlbumActions>): Promise<void> => {
    dispatch<AlbumActions>({ type: 'album/fetch/pending' });
    try {
      const albums = await getAlbums();
      dispatch<AlbumActions>({ type: 'album/fetch/success', payload: albums });
    } catch (e) {
      dispatch<AlbumActions>({ type: 'album/fetch/error' });
    }
  };
};
