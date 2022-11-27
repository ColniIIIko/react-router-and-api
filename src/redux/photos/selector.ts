import { RootState } from '../store';

export const selectAlbumsPhoto = (id: number) => (state: RootState) =>
  state.photos.data?.filter((p) => p.albumId === id);
export const selectPhotosPending = (state: RootState) => state.photos.loading;
export const selectPhotosError = (state: RootState) => state.photos.error;
