/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import key from 'uniqid';

function Path({ path }) {
  return (
    <div className="path-container w-100 py-3">
      <div className="container">
        <div className="d-flex">
          {path.map(({ name, path }, i) => (
            <div key={key()}>
              <Link to={path} className="px-2">{name}</Link>
              {i === path.length - 1 && (
                <span><i className="bi bi-chevron-compact-right" /></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
Path.defaultProps = {
  path: [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'Product',
      path: '/products',
    },
  ],
};

export default Path;
