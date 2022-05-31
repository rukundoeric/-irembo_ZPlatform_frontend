/* eslint-disable react/prop-types */
import React from 'react';

export default function Line({ label }) {
  return (
    <div className="line py-1">
      <h6><span>{label}</span></h6>
    </div>
  );
}
