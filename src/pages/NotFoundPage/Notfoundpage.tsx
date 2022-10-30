import React from 'react';
import { Link } from 'react-router-dom';
import './notfoundpage.scss';

function Notfoundpage() {
  return (
    <div className='not-found'>
      <p>Page not found 😞</p>
      <Link
        to='/'
        className='not-found__go-home'
      >
        go home
      </Link>
    </div>
  );
}

export default Notfoundpage;
