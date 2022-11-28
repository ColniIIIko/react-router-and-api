import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../redux/store';
import { Action } from 'redux';
import { fetchUsers } from '../../redux/users/actions';
import { fetchAlbums } from '../../redux/albums/actions';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectUser } from '../../redux/users/selector';
import { selectAlbumsUserId } from '../../redux/albums/selector';
import './userpage.scss';
import Notfoundpage from '../NotFoundPage/Notfoundpage';

const mapDispatchToProp = (dispatch: ThunkDispatch<RootState, void, Action>) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchAlbums: () => dispatch(fetchAlbums()),
  };
};

const mapStateToProp = (state: RootState) => {
  return {
    users: state.users.data,
    albums: state.albums.data,
    loading: state.users.loading || state.albums.loading,
    error: state.users.error || state.albums.error,
  };
};

const connector = connect(mapStateToProp, mapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function Userpage({ users, albums, error, loading, fetchUsers, fetchAlbums }: Props) {
  const { id } = useParams();

  const user = useSelector(selectUser(Number(id)));
  const userAlbums = useSelector(selectAlbumsUserId(Number(id)));

  useEffect(() => {
    if (!users) fetchUsers();
    if (!albums) fetchAlbums();
  }, [albums, fetchAlbums, fetchUsers, users]);

  if (error) return <Navigate to='/oops' />;
  if (users && user === null) return <Notfoundpage />;

  return loading ? (
    <Loader />
  ) : (
    <div className='user'>
      <div className='user-info'>
        <h3 className='user-info__name'>{user?.name}</h3>
        <p className='user-info__surname user-info__sub'>Username: {user?.username}</p>
        <p className='user-info__email user-info__sub'>
          Email: <a href={`mailto:${user?.email}`}>{user?.email} </a>
        </p>
        <p className='user-info__phone user-info__sub'>Phone: {user?.phone}</p>
        <p className='user-info__website user-info__sub'>
          Site:{' '}
          <a
            href={`http://${user?.website}`}
            target='blank'
          >
            {user?.website}
          </a>
        </p>
      </div>
      <div>
        <h4>{`${/^.* /.exec(user?.name || '')}'s albums:`}</h4>
        <ul className='user-albums'>
          {userAlbums?.map((album) => (
            <li
              key={album.id}
              className='user-albums__item'
            >
              <Link to={`/albums/${album.id}`}>{album.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default connector(Userpage);
