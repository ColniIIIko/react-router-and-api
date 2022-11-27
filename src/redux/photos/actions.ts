import { Dispatch } from 'redux';
import { getPhotos } from '../../fetchRoutes/albums';
import { PhotoAction } from './reducer';

export const fetchPhotos = () => {
  return async (dispatch: Dispatch<PhotoAction>): Promise<void> => {
    dispatch<PhotoAction>({ type: 'photo/fetch/pending' });
    try {
      const photos = await getPhotos();
      dispatch<PhotoAction>({ type: 'photo/fetch/success', payload: photos });
    } catch (e) {
      dispatch<PhotoAction>({ type: 'photo/fetch/error' });
    }
  };
};
