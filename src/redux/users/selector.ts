import { RootState } from '../store';

export const selectUser = (id: number) => (state: RootState) =>
  state.users.data?.find((u) => u.id === id) || null;
export const selectUsers = (state: RootState) => state.users.data;
export const selectUsersPending = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;
