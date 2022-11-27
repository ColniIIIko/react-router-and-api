import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { fetchUsers } from '../../redux/users/actions';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../../redux/store';
import './userpage.scss';

const mapDispatchToProp = (dispatch: ThunkDispatch<RootState, void, Action>) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

const mapStateToProp = (state: RootState) => {
  return {
    ...state.users,
  };
};

const connector = connect(mapStateToProp, mapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function Userspage({ data, loading, error, fetchUsers }: Props) {
  useEffect(() => {
    if (!data) {
      fetchUsers();
    }
  }, [data, fetchUsers]);

  if (error) return <Navigate to='/oops' />;

  return loading ? (
    <Loader />
  ) : (
    <ul className='users-list'>
      {data?.map((user) => (
        <li key={user.id}>
          <Link
            className='users-list__item'
            to={`${user.id}`}
          >
            {user.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default connector(Userspage);
