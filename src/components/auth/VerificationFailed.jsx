/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Button, ProgressBar } from '../shared/Elements';
import { resentVerification } from '../../api';
import {
  Email,
} from '../shared/Input';
import Loader from '../shared/Loader';
import { Validate } from '../../helpers';
import VerificationSent from './VerificationSent';
import Alert from '../shared/Alert';

function VericationFailed({ alert: defaultAlert }) {
  const [email, setEmail] = useState();
  const [emailErrors, setEmailErrors] = useState(null);
  const [status, setStatus] = useState();
  const [alert, setAlert] = useState(defaultAlert);
  const [showAlert, setShowAlert] = useState(true);
  const canContinue = !!(!emailErrors && email);
  const handleEmailChange = e => {
    setEmail(e.target.value);
    const { error } = Validate('signup', { email: e.target.value });
    setEmailErrors(error ? error.details : undefined);
  };
  const ValidateInputs = () => {
    handleEmailChange({ target: { value: email } });
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = data => {
    setAlert(data || defaultAlert);
    setShowAlert(true);
  };
  const handleResend = e => {
    e.preventDefault();
    if (!canContinue) {
      ValidateInputs();
    } else {
      setStatus('pending');
      resentVerification(email, err => {
        if (err) {
          setStatus('fail');
          const resScode = err?.response?.status;
          if (resScode === 400 || resScode === 409) {
            setEmailErrors(err?.response.data && [{ ...err.response.data.error.email }]);
          } else {
            handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
          }
        } else {
          setStatus('success');
        }
      });
    }
  };

  if (status === 'success') {
    return (<VerificationSent email={email} />);
  }
  return (
    <div className="empty-container d-flex flex-column email-sent">

      {status === 'pending' ? (
        <div>
          <ProgressBar />
          <div className="empty-content email-sent d-flex flex-column">
            <div className="d-flex position-relative"><Loader /></div>
          </div>
        </div>
      ) : (
        <div className="empty-content email-sent d-flex p-3">
          {(showAlert && alert) && (<Alert info={alert} handleCloseAlert={handleCloseAlert} />)}
          <div className="v-c-failed p-4 d-flex flex-column text-center justify-content-center align-items-center">
            <h1 className="error"><i className="bi bi-envelope-exclamation" /></h1>
            <h3 className="text-1 mt-3">Verification failed 😥</h3>
            <small className="text-2 px-4 text-center">The provided token is invalid or expired. </small>
            <small className="text-2 px-4 text-center">Please keep in mind that the verfication token is only valid for 5 minutes. </small>
            <div className="v-comp-1 d-flex justify-content-center align-items-center mt-3">
              <div>
                <form onSubmit={handleResend}>
                  <Email handleOnChange={handleEmailChange} value={email} errors={emailErrors} labeled={false} />
                  <Button label="Resend verification" classes={`primary-button ${canContinue ? '' : 'disabled'} mt-3`} />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  );
}

export default VericationFailed;
