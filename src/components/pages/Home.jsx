/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
// import useAuth from '../../hooks/useAuth';

export default function Dashboard() {
  // const { auth } = useAuth();
  return (
    <main className="admin d-flex">
      <div className="sid-content flex-grow-1">
        <Header />
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
