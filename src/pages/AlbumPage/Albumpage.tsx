import React, { useEffect } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Loader from '../../components/Loader/Loader';
import { fetchAlbums } from '../../redux/albums/actions';
import { selectAlbum } from '../../redux/albums/selector';
import { fetchPhotos } from '../../redux/photos/actions';
import { selectAlbumsPhoto } from '../../redux/photos/selector';
import { RootState } from '../../redux/store';
import { fetchUsers } from '../../redux/users/actions';
import { selectUser } from '../../redux/users/selector';
import Notfoundpage from '../NotFoundPage/Notfoundpage';
import './albumpage.scss';

const mapDispatchToProp = (dispatch: ThunkDispatch<RootState, void, Action>) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchAlbums: () => dispatch(fetchAlbums()),
    fetchPhotos: () => dispatch(fetchPhotos()),
  };
};

const mapStateToProp = (state: RootState) => {
  return {
    users: state.users.data,
    albums: state.albums.data,
    photos: state.photos.data,
    loading: state.users.loading || state.albums.loading || state.photos.loading,
    error: state.users.error || state.albums.error || state.photos.error,
  };
};

const connector = connect(mapStateToProp, mapDispatchToProp);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function Albumpage({
  users,
  albums,
  photos,
  error,
  loading,
  fetchUsers,
  fetchAlbums,
  fetchPhotos,
}: Props) {
  const { id } = useParams();

  const userAlbum = useSelector(selectAlbum(Number(id)));
  const user = useSelector(selectUser(userAlbum?.userId || -1));
  const albumPhoto = useSelector(selectAlbumsPhoto(userAlbum?.id || -1));

  useEffect(() => {
    if (!users) fetchUsers();
    if (!albums) fetchAlbums();
    if (!photos) fetchPhotos();
  }, [albums, fetchAlbums, fetchPhotos, fetchUsers, photos, users]);

  if (error) return <Navigate to='/oops' />;
  if (albums && userAlbum === null) return <Notfoundpage />;

  return loading ? (
    <Loader />
  ) : (
    <div className='album'>
      <h3 className='album__title'>{userAlbum?.title}</h3>
      <p className='album__creator'>
        Creator: <Link to={`/users/${user?.id}`}>{user?.name}</Link>
      </p>
      <div className='album__photos'>
        {albumPhoto?.map((photo) => (
          <div key={photo.id}>
            <img
              alt={photo.title}
              src={photo.thumbnailUrl}
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
}

export default connector(Albumpage);
