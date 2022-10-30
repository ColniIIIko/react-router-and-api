import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './header.scss';

function Header() {
  return (
    <header>
      <Link
        className='header__link'
        to='/'
      >
        🏡
      </Link>
      <nav className='header__nav'>
        <NavLink
          className={({ isActive }) => 'header__link' + (isActive ? ` header__link_active` : '')}
          to='/albums'
        >
          Albums
        </NavLink>
        <NavLink
          className={({ isActive }) => 'header__link' + (isActive ? ` header__link_active` : '')}
          to='/users'
        >
          Users
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
