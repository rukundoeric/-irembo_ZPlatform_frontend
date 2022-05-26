/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Button, ProgressBar } from '../shared/Elements';
import Loader from '../shared/Loader';
import { resentVerification } from '../../api';

function SignUpVerificationSent({ email }) {
  const [status, setStatus] = useState();
  const [canResend, setCanResend] = useState(false);
  const handleCanResend = () => {
    setTimeout(() => {
      setCanResend(true);
    }, 6 * 10000);
  };
  const handleResend = () => {
    if (canResend) {
      setCanResend(false);
      setStatus('pending');
      resentVerification(email, (err, data) => {
        if (err) {
          setStatus('fail');
        } else {
          setStatus('success');
          handleCanResend(data);
        }
      });
    }
  };
  useEffect(() => { handleCanResend(); }, []);
  return (
    <div className="empty-container email-sent text-center">
      {status === 'pending' ? (
        <div>
          <ProgressBar />
          <div className="empty-content email-sent d-flex flex-column">
            <div className="d-flex position-relative"><Loader /></div>
          </div>
        </div>
      ) : (
        <div className="empty-content">
          <h1 className="email-sent"><i className="bi bi-envelope-paper" /></h1>
          <h3 className="text-1 mt-3">Verfication sent 👍</h3>
          <small className="text-2 d-flex flex-row">
            <span>Verification mail was sent to</span>
            <span className="px-2"><b>{email}</b></span>
          </small>
          <small className="text-2">
            You will be receiveing the email in less than 30 seconds
          </small>
          <div className="f-c-link-b w-auto py-3 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-row">
              <span className="px-1">Did not reveive email? </span>
            </div>
          </div>
          <div className="f-c-link-b w-auto py-3 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-row">
              <Button handleOnClick={handleResend} label="Resend" classes={`primary-button ${(!canResend || status === 'pending') && 'disabled'} mt-3`} />
            </div>
          </div>
        </div>
      ) }

    </div>
  );
}

export default SignUpVerificationSent;
