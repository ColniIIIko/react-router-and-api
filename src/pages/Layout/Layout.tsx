import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './layout.scss';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
