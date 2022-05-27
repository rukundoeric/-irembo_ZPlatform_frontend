/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import key from 'uniqid';
import ProfilePic from '../shared/ProfilePic';
import useLogout from '../../hooks/useLogout';

function MenuItem({
  item: {
    name, icon, count, handleOnclick,
  },
}) {
  return (
    <li>
      {name === 'Logout' && (<hr className="dropdown-divider" />)}
      <button onClick={handleOnclick} className="dropdown-item py-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-items-center align-items-center">
            <span><i className={icon} /></span>
            <span className="px-3">{name}</span>
          </div>
          {count && (
            <div>
              <span className="count">{count}</span>
            </div>
          )}
        </div>
      </button>

    </li>
  );
}

function Header() {
  const logout = useLogout();
  const navigate = useNavigate();
  const menuItems = [
    {
      name: 'Profile',
      icon: 'bi bi-person',
      handleOnclick: () => navigate('/profile'),
    },
    {
      name: 'Logout',
      icon: 'bi bi-box-arrow-left',
      handleOnclick: () => logout(),
    },
  ];
  return (
    <div className="admin-header">
      <header className="p-3">
        <div className="container">
          <div className="d-flex justify-content-between  align-items-center">
            <div className="user-logo d-flex justify-content-center align-items-center name_s">
              <h3 className="mt-3">
                Z
                <strong>PLATFORM</strong>
              </h3>
            </div>
            <div>
              <form className="d-none d-md-block px-3">
                <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
              </form>
            </div>
            <div className="dropdown">
              <ProfilePic />
              <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                {menuItems.map(item => (<MenuItem key={key()} item={item} />))}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
