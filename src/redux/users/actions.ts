import { ThunkDispatch } from 'redux-thunk';
import { getUsers } from '../../fetchRoutes/users';
import { RootState } from '../store';
import { UserActions } from './reducer';

export const fetchUsers = () => {
  return async (dispatch: ThunkDispatch<RootState, void, UserActions>) => {
    dispatch({ type: 'user/fetch/pending' });
    try {
      const users = await getUsers();
      dispatch({ type: 'user/fetch/success', payload: users });
    } catch (e) {
      dispatch({ type: 'user/fetch/error' });
    }
  };
};
