import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { AlbumsReducer } from './albums/reducer';
import { PhotoReducer } from './photos/reducer';
import { UsersReducer } from './users/reducer';

// @ts-ignore
export const store = createStore(
  combineReducers({
    albums: AlbumsReducer,
    users: UsersReducer,
    photos: PhotoReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
