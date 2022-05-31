/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ProgressBar } from '../../shared/Elements';
import Alert from '../../shared/Alert';
import { requestAccountVerification } from '../../../api';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useFileUpload from '../../../hooks/useFileUpload';
import useGlobalState from '../../../hooks/useGlobalState';

function ProfileVerifyAccount({ alert: defaultAlert }) {
  const upload = useFileUpload();
  const { appState, setAppState } = useGlobalState();
  const { user } = appState;
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(user?.profile?.n_id_image);
  const [n_id, setNid] = useState(user?.profile?.u_id || '');
  const [alert, setAlert] = useState(defaultAlert);
  const [showAlert, setShowAlert] = useState(true);
  const [status, setStatus] = useState();
  const [file, setFile] = useState();

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = data => {
    setAlert(data || defaultAlert);
    setShowAlert(true);
  };

  const handlePhoto = e => {
    const files = e?.target?.files;
    const file = files[0];
    if (!/^image\//.test(file.type)) {
      setAlert({ type: 'err', message: 'Only images are allowed to be choosed as offcial document prof!' });
    } else {
      const photo = window.URL.createObjectURL(file);
      setPhoto(photo);
      setFile(file);
    }
  };
  const handleLoadImageError = () => {
    setPhoto(undefined);
  };

  const handleNID = e => {
    const value = e?.target.value;
    setNid(value);
  };

  const handleProfileUpadate = e => {
    e.preventDefault();
    setStatus('pending');
    upload(file, (err, data) => {
      if (err) {
        handleShowAlert({ type: 'err', message: 'Something went wrong while trying to upload. please try again latter' });
        setStatus('fail');
      } else {
        const dataObj = {
          n_id,
          n_id_image: data.url,
        };
        requestAccountVerification(axios, dataObj, (err, data) => {
          if (err) {
            setStatus('fail');
            const resScode = err?.response?.status;
            if (resScode === 400 || resScode === 409) {
              handleShowAlert({ type: 'err', message: err?.response?.data?.error?.message });
            } else {
              handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
            }
          } else {
            setAppState({ ...appState, user: data.user });
            setStatus('success');
            setAlert({ type: 'success', message: 'Profile updated successfully. you will be redirected shortlly 😇' });
            setTimeout(() => {
              navigate('/profile');
            }, 5000);
          }
        });
      }
    });
  };

  return (
    <div className="d-flex flex-column w-100 settings">
      {status === 'pending' && (<ProgressBar />)}
      <div className="d-flex w-100 flex-column p-4">
        <div className="col-12">
          {(showAlert && alert) && (<Alert info={alert} handleCloseAlert={handleCloseAlert} />)}
          <h4 className="mb-3">Identification information</h4>
          <form className="needs-validation" noValidate onSubmit={handleProfileUpadate}>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="firstName" className="form-label">National/Passport ID</label>
                <input onChange={handleNID} type="text" value={n_id} className="form-control" id="n_id" name="n_id" placeholder="National/Passport Id" required />
                <div className="invalid-feedback">
                  Valid ID is required.
                </div>
              </div>
              <div className="col-12 d-flex flex-column">
                <label htmlFor="official_doc_Image" className="form-label">Official Document image(Prof of official document)</label>
                <input onChange={handlePhoto} type="file" name="official_doc_Image" id="official_doc_Image" accept="image/*" />
                { photo && (
                  <div>
                    <div className="col-12 d-flex justify-content-center align-items-center">
                      <div className="img-container mt-5">
                        <img className="w-100" src={photo} alt="profile" onError={handleLoadImageError} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button label="Save" classes="primary-button mt-5" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileVerifyAccount;
