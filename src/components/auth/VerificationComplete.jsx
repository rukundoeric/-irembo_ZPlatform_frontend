/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import QueryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProgressBar } from '../shared/Elements';
import Loader from '../shared/Loader';
import VerificationFailed from './VerificationFailed';
import useAuth from '../../hooks/useAuth';
import { verifyUser } from '../../api';

function SignUpVerificationComple() {
  const [status, setStatus] = useState('pending');
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleRedirect = response => {
    setTimeout(() => {
      setAuth({ ...response });
      navigate('/');
    }, 8000);
  };

  useEffect(() => {
    const { session } = QueryString.parse(location.search);
    setStatus('pending');
    verifyUser(session, (err, data) => {
      if (err) {
        setStatus('fail');
      } else {
        setStatus('success');
        handleRedirect(data);
      }
    });
  }, []);

  if (status === 'fail') {
    return (<VerificationFailed />);
  }

  return (
    <div className="empty-container d-flex flex-column email-sent">
      {
        status === 'pending' ? (
          <div>
            <ProgressBar />
            <div className="empty-content email-sent d-flex flex-column">
              <div className="d-flex position-relative"><Loader /></div>
            </div>
          </div>
        ) : status === 'success' ? (
          <div className="empty-content email-sent">
            <h1 className="email-sent"><i className="bi bi-envelope-check" /></h1>
            <h3 className="text-1 mt-3"> Account validated 👍</h3>
            <small className="text-2">Your account has been validated successfully</small>
            <small className="text-2">
              You will be redirected in 5 seconds
            </small>
          </div>
        ) : (<div />)
      }
    </div>
  );
}

export default SignUpVerificationComple;
