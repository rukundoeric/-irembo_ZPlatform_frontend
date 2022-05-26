/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable brace-style */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QueryString from 'query-string';
import { Validate } from '../../helpers';
import {
  Password,
} from '../shared/Input';
import { Button, ProgressBar } from '../shared/Elements';
import { ContentHead } from '../shared/Contents';
import { applyPasswordReset } from '../../api/_user';
import Alert from '../shared/Alert';

function ApplyPasswordReset({ alert: defaultAlert }) {
  const [alert, setAlert] = useState(defaultAlert);
  const [showAlert, setShowAlert] = useState(true);
  const [status, setStatus] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [confirmErrors, setConfirmErrors] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState(null);
  const form = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const canContinue = !!(!confirmErrors && !passwordErrors && confirm && password && (password === confirm));

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = data => {
    setAlert(data || defaultAlert);
    setShowAlert(true);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    const { error } = Validate('signup', { password: e.target.value });
    setPasswordErrors(error ? error.details : undefined);
  };
  const handleConfirmChange = e => {
    setConfirm(e.target.value);
  };
  const ValidateInputs = () => {
    handlePasswordChange({ target: { value: password } });
    setConfirmErrors(password === confirm ? undefined : [{ message: 'Invalid confirmation password! 😞' }]);
  };
  const handleSusccess = () => {
    setStatus('success');
    setAlert({ type: 'success', message: 'Password changed successfully. you will be redirected shortlly 😇' });
    setTimeout(() => {
      navigate('/login');
    }, 5000);
  };
  const handleSignUp = e => {
    e.preventDefault();
    if (status !== 'pending') {
      if (!canContinue) {
        ValidateInputs();
      } else {
        setStatus('pending');
        const { session } = QueryString.parse(location.search);
        applyPasswordReset({ password, confirm }, session, err => {
          if (err) {
            setStatus('fail');
            const resScode = err?.response?.status;
            resScode === 400 ? setPasswordErrors([{ message: 'Invalid password! 😞' }])
              : resScode === 401 ? handleShowAlert({ type: 'err', message: 'You are not authorired to perform this action' })
                : resScode === 403 ? handleShowAlert({ type: 'err', message: 'Your session is either invalid or expired. would you like to ', action: { to: '/forgot-password', text: 're-request password confirmation?' } })
                  : handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
          } else {
            handleSusccess();
          }
        });
      }
    }
  };
  return (
    <div className="signUpContainer loginContainer">
      <div className="row loginContent">
        <div className="col-12 right d-flex justify-content-center align-items-center">
          <div className="c-f-u-content">
            <ContentHead label="Sign Up 🤞" />
            <div className="c-f-content">
              {status === 'pending' && (<ProgressBar />)}
              <div className="c-f-i-content py-4 px-5">
                {(showAlert && alert) && (<Alert info={alert} handleCloseAlert={handleCloseAlert} />)}
                <div className="c-content-fields w-auto">
                  <form
                    onSubmit={handleSignUp}
                    className="needs-validation"
                    ref={form}
                  >
                    <Password
                      handleOnChange={handlePasswordChange}
                      value={password}
                      label="New password"
                      errors={passwordErrors}
                    />
                    <Password
                      handleOnChange={handleConfirmChange}
                      value={confirm}
                      label="Confirm New password"
                      errors={confirmErrors}
                    />
                    <Button label="Change Password" classes={`primary-button ${(!canContinue || status === 'pending') && 'disabled'} mt-3`} />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
ApplyPasswordReset.defaultProps = {
  alert: {
    type: 'warn',
    message: 'This action will only be accepted in next short less than 10 minutes. if you run out of time, you will have to request password reset confirmation again.',
  },
};

export default ApplyPasswordReset;
