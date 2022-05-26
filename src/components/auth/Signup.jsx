/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable brace-style */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Validate } from '../../helpers';
import {
  Email, Password, TCPPAgree,
} from '../shared/Input';
import { Button, ProgressBar } from '../shared/Elements';
import Line from '../shared/Line';
import { ContentHead } from '../shared/Contents';
import VerificationSent from './VerificationSent';
import { signUp } from '../../api';
import GoogleLogin from './GoogleLogin';
import Alert from '../shared/Alert';
import useAuth from '../../hooks/useAuth';

function SignUp({ alert: defaultAlert }) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState();
  const [status, setStatus] = useState();
  const [password, setPassword] = useState();
  const [agreeToTC, setAgreeToTC] = useState(false);
  const [emailErrors, setEmailErrors] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState(null);
  const [agreeErrors, setAgreeErrors] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState();
  const [alert, setAlert] = useState(defaultAlert);
  const [showAlert, setShowAlert] = useState(true);
  const from = location?.state?.from?.pathname || '/';
  const form = useRef();
  const canContinue = !!(!emailErrors && !passwordErrors && email && password && agreeToTC);

  const handleEmailChange = e => {
    setEmail(e.target.value);
    const { error } = Validate('signup', { email: e.target.value });
    setEmailErrors(error ? error.details : undefined);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
    const { error } = Validate('signup', { password: e.target.value });
    setPasswordErrors(error ? error.details : undefined);
  };
  const handleAgree = e => {
    const { checked } = e.target;
    setAgreeToTC(checked);
    setAgreeErrors(checked ? undefined : [{ message: 'Please confirm that you agree to our terms and conditions.' }]);
  };
  const ValidateInputs = () => {
    handleEmailChange({ target: { value: email } });
    handlePasswordChange({ target: { value: password } });
    handleAgree({ target: { checked: agreeToTC } });
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = data => {
    setAlert(data || defaultAlert);
    setShowAlert(true);
  };
  const handleSignupSuccess = () => {
    setSignupSuccess(true);
  };
  const handleGoogleLoginSuccess = response => {
    setEmailErrors(undefined);
    setPasswordErrors(undefined);
    setAuth({ ...response });
    navigate(from, { replace: true });
  };
  const handleSignUp = e => {
    e.preventDefault();
    if (status !== 'pending') {
      if (!canContinue) {
        ValidateInputs();
      } else {
        setStatus('pending');
        const data = { email, password, role: 'PATIENT' };
        signUp(data, (err, data) => {
          if (err) {
            setStatus('fail');
            const resScode = err?.response?.status;
            if (resScode === 400 || resScode === 409) {
              setEmailErrors(err?.response.data && [{ ...err.response.data.error.email }]);
              setPasswordErrors(err?.response.data && [{ ...err.response.data.error.password }]);
            } else {
              handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
            }
          } else {
            handleSignupSuccess(data);
          }
        });
      }
    }
  };

  if (signupSuccess) {
    return (<VerificationSent email={email} />);
  }

  return (
    <div className="signUpContainer loginContainer">
      <div className="row loginContent">
        <div className="col-12 right d-flex justify-content-center align-items-center">
          <div className="c-f-u-content">
            <ContentHead />
            <div className="c-f-content">
              {status === 'pending' && (<ProgressBar />)}
              <div className="c-f-i-content py-4 px-5">
                {(showAlert && alert) && (<Alert info={alert} handleCloseAlert={handleCloseAlert} />)}
                <div className="c-content-fields w-auto">
                  <h6>Sign Up 🤞</h6>
                  <form
                    onSubmit={handleSignUp}
                    className="needs-validation"
                    ref={form}
                  >
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
                    <TCPPAgree handleAgree={handleAgree} errors={agreeErrors} />
                    <Button label="Sign Up" classes={`primary-button ${(!canContinue || status === 'pending') && 'disabled'} mt-3`} />
                    <Line label="Or" />
                    <GoogleLogin
                      handleStatus={status => setStatus(status)}
                      handleShowAlert={handleShowAlert}
                      handleSuccess={handleGoogleLoginSuccess}
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="f-c-link-b w-auto py-3 d-flex justify-content-center align-items-center">
              <div className="d-flex flex-row">
                <span className="px-1">Already have an account? </span>
                <Link to="/login">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
