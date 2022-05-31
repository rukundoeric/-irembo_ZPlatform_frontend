/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export function ProductPlaceholder(props) {
  return (
    <div className="col-12">
      <div className="product p-4 d-flex justify-content-center align-items-center">
        <div className="mt-3">
          <ThreeDots
            color="#F5F5F5"
            height="60"
            width="100"
          />
        </div>
      </div>
    </div>
  );
}

export function CartPlaceholder(props) {
  return (
    <div>Placeholder</div>
  );
}
