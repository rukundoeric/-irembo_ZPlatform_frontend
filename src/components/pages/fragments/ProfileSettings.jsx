/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Toggle } from '../../shared/Input';
import { turnOnOrOffSecondFactorAuth, validateLoginToken } from '../../../api';
import useGlobalState from '../../../hooks/useGlobalState';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Alert from '../../shared/Alert';
import { ProgressBar } from '../../shared/Elements';

function ProfileSettings({ alert: defaultAlert }) {
  const axios = useAxiosPrivate();
  const { appState: { user }, setAppState } = useGlobalState();
  const [mfAuth, setmfAuth] = useState(user?.m_f_auth !== 'off');
  const [isLoginTokenOn, setIsLoginTokenOn] = useState(user?.is_login_token_on);
  const [loginToken, setLoginToken] = useState();
  const [status, setStatus] = useState();
  const [alert, setAlert] = useState(defaultAlert);
  const [showAlert, setShowAlert] = useState(true);
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = data => {
    setAlert(data || defaultAlert);
    setShowAlert(true);
  };
  const handleMFAuthentication = () => {
    const value = mfAuth === false ? 'on' : 'off';
    setStatus('pending');
    turnOnOrOffSecondFactorAuth(axios, { value, user_id: user.user_id }, (err, data) => {
      if (err) {
        setStatus('fail');
        const resScode = err?.response?.status;
        resScode === 401 ? handleShowAlert({ type: 'err', message: 'You are not authorired to perform this action' })
          : handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
      } else {
        setStatus('success');
        setmfAuth(data?.user?.m_f_auth !== 'off');
        setAppState(prev => ({ ...prev, user: data?.user }));
        handleShowAlert({ type: 'info', message: data?.message });
      }
    });
  };
  const handleShowToken = value => {
    setLoginToken(value);
    setTimeout(() => { setLoginToken(null); }, 30000);
  };
  const handleLoginToken = () => {
    const value = isLoginTokenOn ? 'on' : 'off';
    setStatus('pending');
    validateLoginToken(axios, { value }, (err, data) => {
      if (err) {
        setStatus('fail');
        const resScode = err?.response?.status;
        resScode === 401 ? handleShowAlert({ type: 'err', message: 'You are not authorired to perform this action' })
          : handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
      } else {
        setStatus('success');
        setIsLoginTokenOn(!!data?.login_token);
        setAppState(prev => ({ ...prev, user: data?.user }));
        handleShowAlert({ type: 'warn', message: data?.message });
        handleShowToken(data?.login_token);
      }
    });
  };

  return (
    <div className="d-flex flex-column w-100 settings">
      {status === 'pending' && (<ProgressBar />)}
      <div className="d-flex flex-column w-100 p-4">
        {(showAlert && alert) && (<Alert info={alert} handleCloseAlert={handleCloseAlert} />)}
        <div className="d-flex w-100 flex-column">
          <div className="d-flex setting-item p-4">
            <div className="d-flex flex-column flex-grow-1 py-1">
              <h4>Multi-factor authentication</h4>
              <p>Multi-factor authentication is an electronic authentication method in which a user is granted access to a website or application only after successfully presenting two or more pieces of evidence to an authentication mechanism. Having said, that, by turning on this, you will be confirming that, before the sysytem logs you in, you will also have to provide a one-time-password that will be be shared to you via Email.</p>
            </div>
            <div className="d-flex">
              <Toggle handleOnChange={handleMFAuthentication} value={mfAuth} />
            </div>
          </div>
          <div className="d-flex flex-column setting-item p-4">
            <div className="d-flex">
              <div className="d-flex flex-column flex-grow-1 py-1">
                <h4>Personal access token</h4>
                <p>{'This is the token that helps you to login to your account without having to provide email and password. please note that anyone with the token would have access to your account. so before you turn this on, we strongly recomend you turn on second-factor authentication if you haven\'t done so'}</p>
              </div>
              <div className="d-flex">
                <Toggle handleOnChange={handleLoginToken} value={isLoginTokenOn} />
              </div>
            </div>
            {loginToken && (
            <div className="d-flex flex-column">
              <div className="py-1">
                <p><b><i>Copy the following token and keep it safe. Note: this token will disappear in 30 seconds. if does, you will have to invalidate it and generate a new one.</i></b></p>
              </div>
              <div className="l-g-token p-2">
                <span>{loginToken}</span>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
