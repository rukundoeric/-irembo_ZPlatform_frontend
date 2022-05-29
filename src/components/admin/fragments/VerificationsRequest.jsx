/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import key from 'uniqid';
import ProfilePic from '../../shared/ProfilePic';
import { Button, ProgressBar } from '../../shared/Elements';
import { getVerificationRequests } from '../../../api/_user';
import Alert from '../../shared/Alert';
import Loader from '../../shared/Loader';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { verifyAccount } from '../../../api';

function ReviewForm({ handleRefreshItems, request_id }) {
  const [review1, setReview1] = useState();
  const [review2, setReview2] = useState();
  const [alert, setAlert] = useState();
  const [showAlert, setShowAlert] = useState(true);
  const [status, setStatus] = useState();
  const axios = useAxiosPrivate();
  const canContinue = review1 && review2;

  const handleReview1 = e => {
    const value = e?.target?.value;
    setReview1(value);
  };
  const handleReview2 = e => {
    const value = e?.target?.value;
    setReview2(value);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = data => {
    setAlert(data);
    setShowAlert(true);
  };
  const handleSubmitReview = e => {
    e.preventDefault();
    if (canContinue) {
      const result = (review1 === 'Yes' && review2 === 'Yes') ? 'accepted' : 'rejected';
      let description = review1 === 'No' ? 'Identification Number is invalid. ' : 'Identification Number is valid. ';
      description += review2 === 'No' ? ' Prof is not clear and might not match with Identiny number provided' : ', Prof is clear and it matched with Identiny number provided';
      const review = {
        request_id,
        result,
        description,
      };
      verifyAccount(axios, review, err => {
        if (err) {
          setStatus('fail');
          const resScode = err?.response?.status;
          if (resScode === 400 || resScode === 409) {
            handleShowAlert({ type: 'err', message: err?.response?.data?.error?.message });
          } else {
            handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
          }
        } else {
          setStatus('success');
          setAlert({ type: 'success', message: 'Your review submitted successfully 😇' });
          setTimeout(() => {
            handleRefreshItems();
          }, 5000);
        }
      });
    }
  };
  return (
    <div className="d-flex w-100 flex-column p-4">
      {status === 'pending' && (<ProgressBar />)}
      {(showAlert && alert) && (<Alert info={alert} handleCloseAlert={handleCloseAlert} />)}
      <form noValidate onSubmit={handleSubmitReview}>
        <div className="col-12">
          <label htmlFor="country" className="form-label">Given ID/PASSPORT number is valid ?</label>
          <select onChange={handleReview1} value={review1} className="form-select" id="review1" name="review1" required>
            <option value="">Choose...</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="country" className="form-label">Official document prof is clear and it matches with the Identiny number provided ?</label>
          <select onChange={handleReview2} value={review2} className="form-select" id="review1" name="review1" required>
            <option value="">Choose...</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div className="col-12">
          <Button label="Submit" classes={`primary-button ${(!canContinue || status === 'pending') && 'disabled'}`} />
        </div>
      </form>
    </div>
  );
}

function RequestItem({ request: { status, account, request_id }, handleRefreshItems }) {
  const [showDetails, setShowDetails] = useState(false);
  const email = account?.email;
  const name = (account?.profile?.first_name || account?.profile?.last_name)
    ? `${account?.profile?.first_name || ''} ${account?.profile?.last_name || ''}` : email.split('@')[0];

  const handleShowDetails = () => setShowDetails(prev => !prev);
  return (
    <div className="request-item d-flex flex-column setting-item p-4">
      <div className="d-flex flex-column flex-md-row w-100">
        <div className="d-flex flex-grow-1 py-1 align-items-center">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="px-2">
              <ProfilePic user={account} width={50} height={50} />
            </div>
          </div>
          <div className="d-flex flex-column justify-items-center">
            <h6>{name}</h6>
            <small>{email}</small>
          </div>
          <div className={`st-${status?.toLowerCase() || 'unverified'}`}>
            <span className="py-2 px-3 align-items-center mx-2 text-small">
              {status?.toUpperCase() || 'UNVERIFIED'}
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <div><Button handleOnClick={handleShowDetails} label="View Details" classes="primary-button" /></div>
        </div>
      </div>
      {showDetails && (
      <div className="d-flex w-100 flex-column">
        <hr />
        <h6>Profile Status</h6>
        <div className={`st-${account?.account_verified.toLowerCase()} mb-3 py-3`}>
          <span className="py-2 px-3 align-items-center">
            {account?.account_verified}
          </span>
        </div>
        <h6 className="mb-3">Profile Information</h6>
        <hr />
        <div>
          <span>
            <strong>Email: </strong>
            {account?.email}
          </span>
        </div>
        <div>
          <span>
            <strong>Gender: </strong>
            {account?.profile?.gender}
          </span>
        </div>
        <div>
          <span>
            <strong>Age: </strong>
            {account?.profile?.age}
          </span>
        </div>
        <div>
          <span>
            <strong>Date of birth: </strong>
            {account?.profile?.date_of_birth}
          </span>
        </div>
        <div>
          <span>
            <strong>Marital status: </strong>
            {account?.profile?.marital_status}
          </span>
        </div>
        <div>
          <span>
            <strong>Nationality: </strong>
            {account?.profile?.nationality}
          </span>
        </div>
        <h6 className="mt-5">Identification Information</h6>
        <hr />
        <div>
          <span>
            <strong>ID/PASSPORT NUMBER: </strong>
            {account?.profile?.n_id || 'N/A'}
          </span>
        </div>
        <div>
          <span>
            <strong>PROF OF OFFICAL DOCUMENT: </strong>
          </span>
          <img src={account?.profile?.n_id_image} alt="official_document" width={100} />
        </div>
        <hr />
        {account?.account_verified === 'PENDING' && (
          <div>
            <h6 className="mt-5">Your Review</h6>
            <hr />
            <ReviewForm account={account} request_id={request_id} handleRefreshItems={handleRefreshItems} />
          </div>
        )}
      </div>
      )}
    </div>
  );
}

export default function VerificationsRequest({ alert: defaultAlert }) {
  const axios = useAxiosPrivate();
  const [requests, setRequests] = useState();
  const [alert, setAlert] = useState();
  const [showAlert, setShowAlert] = useState(true);
  const [status, setStatus] = useState();
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = data => {
    setAlert(data || defaultAlert);
    setShowAlert(true);
  };

  const handleRefreshItems = () => {
    setStatus('pending');
    getVerificationRequests(axios, (err, data) => {
      if (err) {
        handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
        setStatus('fail');
      } else {
        setRequests(data?.length <= 0 ? undefined : data);
        setStatus('success');
      }
    });
  };

  useEffect(() => {
    handleRefreshItems();
  }, []);
  return (
    <div className="d-flex w-100 settings p-4">
      {status === 'pending' && (<ProgressBar />)}
      <div className="d-flex w-100 flex-column">
        {(showAlert && alert) && (<Alert info={alert} handleCloseAlert={handleCloseAlert} />)}
        {status === 'pending' ? (
          <div className="d-flex justify-content-center aling-items-center">
            <div className="empty-content">
              <div className="d-flex position-relative"><Loader /></div>
            </div>
          </div>
        ) : (
          <div>
            {requests ? (<div>{_.map(requests, item => (<RequestItem request={item} key={key()} handleRefreshItems={handleRefreshItems} />))}</div>) : (
              <div className="d-flex justify-content-center aling-items-center">
                <div className="empty-content">
                  <h3 className="text-1 mt-3"> No request found 🧐 </h3>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
