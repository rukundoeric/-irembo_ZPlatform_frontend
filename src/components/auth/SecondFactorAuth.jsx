/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Password } from '../shared/Input';
import { Button, ProgressBar } from '../shared/Elements';
import { ContentHead } from '../shared/Contents';
import useAuth from '../../hooks/useAuth';
import useGlobalState from '../../hooks/useGlobalState';
import Alert from '../shared/Alert';
import { logInSecondFactorAuth, resentOneTimePassword } from '../../api';

function SecondFactorAuth({ alert: defaultAlert }) {
  const { setAuth } = useAuth();
  const { setAppState } = useGlobalState();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';
  const user_id = location?.state?.user_id;
  const email = location?.state?.email;
  const [status, setStatus] = useState();
  const [password, setPassword] = useState();
  const [passwordErrors, setPasswordErrors] = useState(null);
  const [alert, setAlert] = useState(defaultAlert);
  const [showAlert, setShowAlert] = useState(true);
  const [canResend, setCanResend] = useState(false);

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  const handleLoginSuccess = ({ access_token, user }) => {
    setPasswordErrors(undefined);
    setAuth({ access_token });
    setAppState({ user });
    navigate(from, { replace: true });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = data => {
    setAlert(data || defaultAlert);
    setShowAlert(true);
  };

  const handleLogin = e => {
    e.preventDefault();
    const data = { user_id, password };
    setStatus('pending');
    logInSecondFactorAuth(data, (err, data) => {
      if (err) {
        setStatus('fail');
        const resScode = err?.response?.status;
        if (resScode === 400 || resScode === 401 || resScode === 403) {
          handleShowAlert({ type: 'err', message: `${err?.response?.data?.error?.message} 😞` });
        } else {
          handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
        }
      } else {
        handleLoginSuccess(data);
      }
    });
  };
  const handleCanResend = () => {
    setTimeout(() => {
      setCanResend(true);
    }, 6 * 10000);
  };
  const handleResend = () => {
    if (canResend) {
      setCanResend(false);
      resentOneTimePassword({ email }, (err, data) => {
        if (err) {
          setStatus('fail');
          handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
        } else {
          handleShowAlert({ type: 'info', message: data?.message });
          setStatus('success');
          handleCanResend();
        }
      });
    }
  };
  useEffect(() => { handleCanResend(); }, []);
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
                  <h6 className="py-2">One-Time Password 🤞</h6>
                  <form onSubmit={handleLogin}>
                    <Password
                      handleOnChange={handlePasswordChange}
                      value={password}
                      errors={passwordErrors}
                      placeholder="XXX-XXX"
                      ShowPassword
                    />
                    <Button label="Continue" classes={`primary-button py-3 ${!password && 'disabled'}`} />
                  </form>
                  <Button handleOnClick={handleResend} label="Resend" classes={`primary-button py-3 ${!canResend && 'disabled'}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SecondFactorAuth.defaultProps = {
  alert: {
    type: 'warn',
    message: 'The password will be sent to your email in less than 5 seconds. Please not that it will be expired in next 5 minutes. If you don\'t receive it, or it expires, use the Resent button below to get a new one.',
  },
};

export default SecondFactorAuth;
