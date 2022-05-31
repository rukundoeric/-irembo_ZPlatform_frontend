/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Email, Password, LoginToken,
} from '../shared/Input';
import { Button, ProgressBar } from '../shared/Elements';
import { ContentHead } from '../shared/Contents';
import useAuth from '../../hooks/useAuth';
import useGlobalState from '../../hooks/useGlobalState';
import Alert from '../shared/Alert';
import { logIn, logInWithAccessToken } from '../../api';

function Login({ alert: defaultAlert }) {
  const { setAuth } = useAuth();
  const { setAppState } = useGlobalState();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';
  const [status, setStatus] = useState();
  const [email, setEmail] = useState();
  const [useLoginToken, setUseLoginToken] = useState();
  const [pAccessToken, setPAccessToken] = useState();
  const [password, setPassword] = useState();
  const [emailErrors, setEmailErrors] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState(null);
  const [alert, setAlert] = useState(defaultAlert);
  const [showAlert, setShowAlert] = useState(true);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  const handlePAccessToken = e => {
    setPAccessToken(e.target.value);
  };
  const handleLoginSuccess = ({ access_token, user }) => {
    if (user.m_f_auth === 'on') return navigate('/login/second-factor-auth', { state: { from, user_id: user?.user_id, email: user?.email }, replace: true });
    setEmailErrors(undefined);
    setPasswordErrors(undefined);
    setAuth({ access_token });
    setAppState({ user });
    return navigate(from, { replace: true });
  };

  const handleUseAccessToken = e => {
    const { checked } = e.target;
    setUseLoginToken(checked);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = data => {
    setAlert(data || defaultAlert);
    setShowAlert(true);
  };
  const handleLoginWithToken = () => {
    setStatus('pending');
    const data = { login_token: pAccessToken };
    logInWithAccessToken(data, (err, data) => {
      if (err) {
        setStatus('fail');
        const resScode = err?.response?.status;
        if (resScode === 400 || resScode === 401 || resScode === 403) {
          handleShowAlert({ type: 'err', message: 'Token is either invalid or expired! 😞' });
        } else {
          handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
        }
      } else {
        handleLoginSuccess(data);
      }
    });
  };
  const handleLoginWithEmailPassword = () => {
    const data = { email, password };
    setStatus('pending');
    logIn(data, (err, data) => {
      if (err) {
        setStatus('fail');
        const resScode = err?.response?.status;
        if (resScode === 400 || resScode === 401 || resScode === 403) {
          handleShowAlert({ type: 'err', message: 'Invalid email or password! 😞' });
        } else {
          handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
        }
      } else {
        handleLoginSuccess(data);
      }
    });
  };
  const handleLogin = e => {
    e.preventDefault();
    useLoginToken ? handleLoginWithToken() : handleLoginWithEmailPassword(e);
  };

  return (
    <div className="loginContainer">
      <div className="row loginContent">
        <div className="col-12 right d-flex justify-content-center align-items-center">
          <div className="c-f-u-content">
            <ContentHead />
            <div className="c-f-content">
              {status === 'pending' && (<ProgressBar />)}
              <div className="c-f-i-content py-4 px-5">
                {(showAlert && alert) && (<Alert info={alert} handleCloseAlert={handleCloseAlert} />)}
                <div className="c-content-fields w-auto">
                  <h6>Sign In 🤞</h6>
                  <form onSubmit={handleLogin}>
                    {useLoginToken ? (
                      <div>
                        <Password
                          handleOnChange={handlePAccessToken}
                          value={password}
                          label="Personal Access Token"
                          errors={passwordErrors}
                          placeholder="XXXXXXXXX"
                          ShowPassword
                        />
                      </div>
                    ) : (
                      <div>
                        <Email
                          handleOnChange={handleEmailChange}
                          value={email}
                          errors={emailErrors}
                          labeled
                        />
                        <Password
                          handleOnChange={handlePasswordChange}
                          value={password}
                          errors={passwordErrors}
                        />
                      </div>
                    )}
                    <LoginToken handleOnChange={handleUseAccessToken} />
                    <div className="c-c-link px-3 py-2 d-flex flex-row-reverse w-auto">
                      <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                    <Button label="Sign In" classes="primary-button" />
                  </form>
                </div>
              </div>
            </div>
            <div className="f-c-link-b w-auto py-3 d-flex justify-content-center align-items-center">
              <div className="d-flex flex-row">
                <span className="px-1">Don&apos;t an account? </span>
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
