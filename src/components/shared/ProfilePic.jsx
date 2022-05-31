/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function ProfilePic({ user: { profile }, width, height }) {
  const profileIcon = profile?.first_name ? `${profile?.first_name[0]}${profile?.last_name[0]}`.toLocaleUpperCase() : '@';
  const [photo, setPhoto] = useState(profile?.photo);

  const handleLoadImageError = () => {
    setPhoto(undefined);
  };

  return (
    <div
      className="d-block profile-pic link-dark text-decoration-none"
      id="dropdownUser1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {photo ? (
        <img src={photo} alt="mdo" width={width} height={height} onError={handleLoadImageError} className="rounded-circle" />
      ) : (
        <div style={{ width, height }} className="rounded-circle profile-pic-n-p d-flex justify-content-center align-items-center">
          <strong>{profileIcon}</strong>
        </div>
      )}
    </div>
  );
}

ProfilePic.defaultProps = {
  width: 32,
  height: 32,
};

export default ProfilePic;
