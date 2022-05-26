import React from 'react';
import Logo from './Logo';

export default function NotFound() {
  return (
    <div className="empty-container text-center">
      <div className="empty-content">
        <Logo />
        <h3 className="text-1 mt-3"> Page Not Found 🧐 </h3>
        <small className="text-2">The page you are looking for, was not found. Please make sure it one of the available resouces for this platform. </small>
      </div>
    </div>
  );
}
