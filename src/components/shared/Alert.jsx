/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

export default function Alert({ info: { type, message, action }, handleCloseAlert }) {
  return (
    <>
      { type === 'warn'
        ? (
          <div className="alert warning-alert d-flex">
            <div className="d-flex  ico">
              <span><i className="bi bi-exclamation-circle" /></span>
            </div>
            <div className="d-flex justify-content-between d-flex flex-grow-1">
              <div>
                <small>{message}</small>
                { action && (<Link to={action.to}>{action.text}</Link>) }
              </div>
              <div className="d-flex">
                <span className="close" onClick={handleCloseAlert}><i className="bi bi-x-lg" /></span>
              </div>
            </div>
          </div>
        ) : type === 'err' ? (
          <div className="alert danger-alert d-flex">
            <div className="d-flex ico">
              <span><i className="bi bi-exclamation-circle" /></span>
            </div>
            <div className="d-flex justify-content-between d-flex flex-grow-1">
              <div>
                <small>{message}</small>
                { action && (<Link to={action.to}>{action.text}</Link>) }
              </div>
              <div>
                <span className="close" onClick={handleCloseAlert}><i className="bi bi-x-lg" /></span>
              </div>
            </div>
          </div>
        ) : type === 'success' ? (
          <div className="alert success-alert d-flex">
            <div className="d-flex ico">
              <span><i className="bi bi-exclamation-circle" /></span>
            </div>
            <div className="d-flex justify-content-between d-flex flex-grow-1">
              <div>
                <small>{message}</small>
                { action && (<Link to={action.to}>{action.text}</Link>) }
              </div>
              <div>
                <span className="close" onClick={handleCloseAlert}><i className="bi bi-x-lg" /></span>
              </div>
            </div>
          </div>

        ) : (
          <div className="alert info-alert d-flex">
            <div className="d-flex ico">
              <span><i className="bi bi-info-circle" /></span>
            </div>
            <div className="d-flex justify-content-between d-flex flex-grow-1">
              <div>
                <small>{message}</small>
                { action && (<Link to={action.to}>{action.text}</Link>) }
              </div>
              <div>
                <span className="close" onClick={handleCloseAlert}><i className="bi bi-x-lg" /></span>
              </div>
            </div>
          </div>

        )}
    </>
  );
}
