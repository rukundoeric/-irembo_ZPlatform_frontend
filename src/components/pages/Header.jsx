/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import key from 'uniqid';
import ProfilePic from '../shared/ProfilePic';
import useLogout from '../../hooks/useLogout';
import useGlobalState from '../../hooks/useGlobalState';

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
  const location = useLocation();
  const pathname = location?.pathname;
  const { appState: { user } } = useGlobalState();
  const [userInfo, setUserInfo] = useState(user);
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
  if (user?.role?.split('.')[1] === '1') {
    menuItems.splice(1, 0, {
      name: 'Verification requests',
      icon: 'bi bi-person',
      handleOnclick: () => navigate('/verification-requests'),
    });
  }
  const name = !userInfo?.profile?.first_name ? userInfo?.email : `${userInfo?.profile?.first_name} ${userInfo?.profile?.last_name}`;
  useEffect(() => { setUserInfo(user); }, [user, pathname]);
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
            <div className="dropdown">
              <div
                className="profile-pic-button d-flex align-items-center justify-content-center py-2 px-3"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-block d-md-none"><span><i className="bi bi-list" /></span></div>
                <div className="d-none d-md-block"><span><i className="bi bi-person" /></span></div>
                <div className="px-2 d-none d-md-block"><small>{name}</small></div>
                <div className="px-2"><ProfilePic user={userInfo} /></div>
                <div className="d-none d-md-block"><span><i className="bi bi-chevron-down" /></span></div>
              </div>
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
