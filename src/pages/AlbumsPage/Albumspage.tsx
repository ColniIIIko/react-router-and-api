import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Loader from '../../components/Loader/Loader';
import { fetchAlbums } from '../../redux/albums/actions';
import { RootState } from '../../redux/store';
import './albumspage.scss';

const mapDispatchToProp = (dispatch: ThunkDispatch<RootState, void, Action>) => {
  return {
    fetchAlbums: () => dispatch(fetchAlbums()),
  };
};

const mapStateToProp = (state: RootState) => {
  return {
    ...state.albums,
  };
};

type State = ReturnType<typeof mapStateToProp>;
type Dispatch = ReturnType<typeof mapDispatchToProp>;

function Albumspage({ data, error, loading, fetchAlbums }: State & Dispatch) {
  useEffect(() => {
    if (!data) {
      fetchAlbums();
    }
  }, [data, fetchAlbums]);

  if (error) return <Navigate to='/oops' />;

  return loading ? (
    <Loader />
  ) : (
    <ul className='albums-list'>
      {data?.map((album) => (
        <li key={album.id}>
          <Link
            to={`${album.id}`}
            className='albums-list__item'
          >
            {album.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default connect(mapStateToProp, mapDispatchToProp)(Albumspage);
