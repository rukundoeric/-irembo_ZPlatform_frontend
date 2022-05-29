/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Path from '../shared/Path';

export default function Dashboard() {
  return (
    <main className="d-flex">
      <div className="sid-content flex-grow-1">
        <Header />
        <Path />
        <div className="p-3 container">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
