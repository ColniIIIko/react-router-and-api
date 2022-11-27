import { RootState } from '../store';

export const selectAlbumsUserId = (id: number) => (state: RootState) =>
  state.albums.data?.filter((a) => a.userId === id);
export const selectAlbum = (id: number) => (state: RootState) =>
  state.albums.data?.find((a) => a.id === id);
export const selectAlbums = (state: RootState) => state.albums.data;
export const selectAlbumsPending = (state: RootState) => state.albums.loading;
export const selectAlbumsError = (state: RootState) => state.albums.error;
