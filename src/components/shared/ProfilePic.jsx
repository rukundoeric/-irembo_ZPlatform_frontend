/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function ProfilePic({ profile: { pic, name } }) {
  const profileIcon = name.split(' ').map(n => n.substring(0, 1)).join('').substring(0, 2);
  return (
    <a
      className="d-block profile-pic link-dark text-decoration-none"
      id="dropdownUser1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {pic ? (
        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
      ) : (
        <span className="p-2 rounded-circle profile-pic-n-p">
          <strong>{profileIcon}</strong>
        </span>
      )}
    </a>
  );
}

ProfilePic.defaultProps = {
  profile: {
    pic: undefined,
    name: 'Eric Rukundo',
    email: 'ericrukundo05@gmail.com',
  },
  width: 40,
  height: 40,
};

export default ProfilePic;
