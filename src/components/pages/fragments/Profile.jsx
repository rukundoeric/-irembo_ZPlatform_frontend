/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Outlet, Link, useLocation, useNavigate,
} from 'react-router-dom';
import { Button } from '../../shared/Elements';
import useGlobalState from '../../../hooks/useGlobalState';

export default function Profile() {
  const location = useLocation();
  const pathname = location?.pathname;
  const { appState: { user } } = useGlobalState();
  const [userInfo, setUserInfo] = useState(user);
  const photo = userInfo?.profile?.photo;
  const firstName = userInfo?.profile?.first_name;
  const lastName = userInfo?.profile?.last_name;
  const avatar = (firstName || lastName) ? `${firstName[0]}${lastName[0]}`.toUpperCase() : '@';
  const name = (firstName && lastName) ? `${firstName} ${lastName}`.toUpperCase() : user.email.split('@')[0];
  useEffect(() => { setUserInfo(user); }, [user, pathname]);
  return (
    <div className="profile-container mt-4">
      <div className="d-flex flex-column flex-md-row">
        <div className="d-flex flex-column col-md-3 col-12 j-c-left">
          <div className="d-flex flex-column j-c-left-inner justify-content-center align-items-center">
            <div className="profile-img-container mt-5">
              {photo ? (
                <img className="profile-image" src={photo} alt="profile" />
              ) : (
                <div className="profile-image d-flex justify-content-center align-items-center">
                  <span>{avatar}</span>
                </div>
              )}
            </div>
            <div className="py-3">
              <h5>{name}</h5>
            </div>
          </div>
          <div className="edit-profile pb-5">
            <Link to="/profile" className={`btn-1 ${pathname === '/profile' && 'active'} py-2`}>Profile info</Link>
            <Link to="/profile/edit" className={`btn-1 ${pathname === '/profile/edit' && 'active'} py-2`}>Edit profile</Link>
            <Link to="/profile/settings" className={`btn-1 ${pathname === '/profile/settings' && 'active'} py-2`}>Settings</Link>
          </div>
        </div>
        <div className="d-flex col-md-9 col-12 j-c-right">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function ProfileInfo() {
  const { appState: { user } } = useGlobalState();
  const navigate = useNavigate();
  const [age] = useState(user?.profile?.age || undefined);
  const [dbf] = useState(user?.profile?.date_of_birth || undefined);
  const [gender] = useState(user?.profile?.gender || undefined);
  const [mStatus] = useState(user?.profile?.marital_status || undefined);
  const [nationality] = useState(user?.profile?.nationality || undefined);

  return (
    <div className="d-flex w-100 j-c-right-inner p-5">
      <div className="d-flex w-100 flex-column">
        <h6>Profile Status</h6>
        <hr />
        <div className={`st-${user?.account_verified.toLowerCase()} mb-3`}>
          <span className="py-2 px-3 align-items-center">
            {user?.account_verified}
          </span>
        </div>
        {user?.account_verified === 'UNVERIFIED' && (
        <div>
          <p>To verify your account, you have to provide identification information and provide the prof of the official document. If you did so and your account is still unverified, that might be becouse your request was rejected due to different reasons. In that case, you will have to check your email and check why your account could not be verified.</p>
          <Button handleOnClick={() => navigate('/profile/verify')} label="Verify Account" classes="primary-button my-3 p-2" />
        </div>
        )}
        <h6 className="mb-3">Profile Information</h6>
        <hr />
        <div>
          <span>
            <strong>Email: </strong>
            {user?.email}
          </span>
        </div>
        <div>
          <span>
            <strong>Gender: </strong>
            {gender}
          </span>
        </div>
        <div>
          <span>
            <strong>Age: </strong>
            {age}
          </span>
        </div>
        <div>
          <span>
            <strong>Date of birth: </strong>
            {dbf}
          </span>
        </div>
        <div>
          <span>
            <strong>Marital status: </strong>
            {mStatus}
          </span>
        </div>
        <div>
          <span>
            <strong>Nationality: </strong>
            {nationality}
          </span>
        </div>
        <h6 className="mt-5">Identification Information</h6>
        <hr />
        <div>
          <span>
            <strong>ID/PASSPORT NUMBER: </strong>
            {user?.profile?.n_id || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}
