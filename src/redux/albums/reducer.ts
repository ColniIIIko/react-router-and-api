import { Reducer, Action } from 'redux';

import { Album } from '../../types/types';

export type AlbumState = {
  loading: boolean | null;
  error: boolean | null;
  data: Album[] | null;
};

export interface PendingAction extends Action {
  type: 'album/fetch/pending';
}

export interface ErrorAction extends Action {
  type: 'album/fetch/error';
}

export interface SuccessAction extends Action {
  type: 'album/fetch/success';
  payload: Album[];
}

export type AlbumActions = PendingAction | ErrorAction | SuccessAction;

const defaultValue: AlbumState = {
  loading: null,
  error: null,
  data: null,
};

export const AlbumsReducer: Reducer<AlbumState, AlbumActions> = (
  state = defaultValue,
  action
): AlbumState => {
  switch (action.type) {
    case 'album/fetch/pending':
      return { ...state, loading: true };
    case 'album/fetch/success':
      return { ...state, data: action.payload || null, loading: false };
    case 'album/fetch/error':
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};
