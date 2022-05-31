/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable brace-style */
import React, { useState, useRef } from 'react';
import {
  Email,
} from '../shared/Input';
import { Button, ProgressBar } from '../shared/Elements';
import { ContentHead } from '../shared/Contents';
import { passwordReset } from '../../api';
import PasswordResetSent from './PasswordResetSent';

function ForgotPassword() {
  const [email, setEmail] = useState();
  const [emailErrors, setEmailErrors] = useState(null);
  const [status, setStatus] = useState();
  const form = useRef();
  const canContinue = !!(!emailErrors && email);

  const handleEmailChange = e => {
    const { value } = e.target;
    setEmail(value);
    setEmailErrors(value.length > 0 ? undefined : [{ message: 'Email can not be blank! 😞' }]);
  };
  const ValidateInputs = () => {
    handleEmailChange({ target: { value: email } });
  };
  const handlePassReset = e => {
    e.preventDefault();
    if (status !== 'pending') {
      if (!canContinue) {
        ValidateInputs();
      } else {
        setStatus('pending');
        passwordReset({ email }, err => {
          if (err) {
            setStatus('fail');
            const resScode = err?.response?.status;
            resScode === 400 ? setEmailErrors([{ message: 'Invalid email! 😞' }])
              : setEmailErrors([{ message: 'Something went wrong, please try again latter! 😞' }]);
          } else {
            setStatus('success');
          }
        });
      }
    }
  };

  if (status === 'success') {
    return (<PasswordResetSent email={email} />);
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
                <div className="c-content-fields w-auto">
                  <h6>Forgot password ? 😉</h6>
                  <form
                    onSubmit={handlePassReset}
                    className="needs-validation"
                    ref={form}
                  >
                    <Email
                      label="If you forgot your passoword, don't worry. we will help to reset it. Please, enter your email in the text input below. we will be sending the confirmation link to your email."
                      handleOnChange={handleEmailChange}
                      value={email}
                      errors={emailErrors}
                      labeled
                    />
                    <Button label="Reset Password" classes={`primary-button ${(!canContinue || status === 'pending') && 'disabled'} mt-3`} />
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

export default ForgotPassword;
