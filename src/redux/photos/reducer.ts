import { Reducer, Action } from 'redux';

import { AlbumPhoto } from '../../types/types';

export type PhotoState = {
  loading: boolean | null;
  error: boolean | null;
  data: AlbumPhoto[] | null;
};

export interface PendingAction extends Action {
  type: 'photo/fetch/pending';
}

export interface ErrorAction extends Action {
  type: 'photo/fetch/error';
}

export interface SuccessAction extends Action {
  type: 'photo/fetch/success';
  payload: AlbumPhoto[];
}

export type PhotoAction = PendingAction | ErrorAction | SuccessAction;

const defaultValue: PhotoState = {
  loading: null,
  error: null,
  data: null,
};

export const PhotoReducer: Reducer<PhotoState, PhotoAction> = (
  state = defaultValue,
  action
): PhotoState => {
  switch (action.type) {
    case 'photo/fetch/pending':
      return { ...state, loading: true };
    case 'photo/fetch/success':
      return { ...state, data: action.payload || null, loading: false };
    case 'photo/fetch/error':
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};
