/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Path from '../shared/Path';

export default function Dashboard() {
  const location = useLocation();
  const [path, setPath] = useState();

  useEffect(() => {
    const pathname = location?.pathname;
    const newPath = [{ name: 'Home', path: '/' }, { name: pathname.split('/').join(' '), path: pathname }];
    setPath(newPath);
  }, [location]);
  return (
    <main className="d-flex">
      <div className="sid-content flex-grow-1">
        <Header />
        <Path path={path} />
        <div className="p-3 container">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
