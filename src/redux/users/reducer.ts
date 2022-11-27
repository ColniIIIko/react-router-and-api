import { Reducer, Action } from 'redux';

import { User } from '../../types/types';

export type UserState = {
  loading: boolean | null;
  error: boolean | null;
  data: User[] | null;
};

export interface PendingAction extends Action {
  type: 'user/fetch/pending';
}

export interface ErrorAction extends Action {
  type: 'user/fetch/error';
}

export interface SuccessAction extends Action {
  type: 'user/fetch/success';
  payload: User[];
}

export type UserActions = PendingAction | ErrorAction | SuccessAction;

const defaultValue: UserState = {
  loading: null,
  error: null,
  data: null,
};

export const UsersReducer: Reducer<UserState, UserActions> = (
  state = defaultValue,
  action
): UserState => {
  switch (action.type) {
    case 'user/fetch/pending':
      return { ...state, loading: true };
    case 'user/fetch/success':
      return { ...state, data: action.payload || null, loading: false };
    case 'user/fetch/error':
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};
