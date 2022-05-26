/* eslint-disable react/prop-types */
import React from 'react';
import { logo, logoWhite } from '../../assets';

function Logo({ width, height, white }) {
  return (
    <img src={white ? logoWhite : logo} style={{ width, height }} className="app-logo" alt="logo" />
  );
}

Logo.defaultProps = {
  with: 60,
  height: 60,
};

export default Logo;
