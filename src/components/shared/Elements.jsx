/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';

function Button({ handleOnClick, label, classes }) {
  return (
    <div className="py-1 input-text-content w-auto">
      <button type="submit" className={`w-100 px-3 py-3 ${classes}`} onClick={handleOnClick}>
        {label}
      </button>
    </div>
  );
}

function ProgressBar({ reff }) {
  return (
    <div ref={reff} className="">
      <div className="progress">
        <div className="indeterminate"> </div>
      </div>
    </div>
  );
}

export {
  Button,
  ProgressBar,
};
