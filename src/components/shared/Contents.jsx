/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import Logo from './Logo';

function Welcome() {
  return (
    <div className="c-lf">
      <div className="d-flex flex-column">
        <div>
          <p>
            Welcome to
            {' '}
            <span className="name">.Dot Pharma.</span>
          </p>
        </div>
        <div>
          <h1>Stay connected to health care</h1>
        </div>
        <div className="d-flex flex-row-reverse">
          <h4>Anywhere you are 👌</h4>
        </div>
      </div>
    </div>
  );
}

function ContentHead() {
  return (
    <div className="c-header">
      <div className="w-auto d-flex justify-content-center align-items-center py-2">
        <Logo width={35} height={35} />
      </div>
      <div className="w-auto d-flex justify-content-center align-items-center py-2">
        <h3>
          Dot
          <strong>Pharma</strong>
        </h3>
      </div>
    </div>
  );
}

export {
  Welcome,
  ContentHead,
};
