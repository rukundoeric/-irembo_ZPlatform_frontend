/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ProgressBar } from '../../shared/Elements';
import Alert from '../../shared/Alert';
import { updateProfile } from '../../../api';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useFileUpload from '../../../hooks/useFileUpload';
import useGlobalState from '../../../hooks/useGlobalState';

function EditProfile({ alert: defaultAlert }) {
  const upload = useFileUpload();
  const { appState: { user }, setAppState } = useGlobalState();
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(user?.profile?.photo || '');
  const [firstName, setFirstName] = useState(user?.profile?.first_name || '');
  const [lastName, setLastName] = useState(user?.profile?.last_name || '');
  const [age, setAge] = useState(user?.profile?.age || '');
  const [dbf, setDbf] = useState(user?.profile?.date_of_birth || '');
  const [gender, setGender] = useState(user?.profile?.gender || '');
  const [mStatus, setmStatus] = useState(user?.profile?.marital_status || '');
  const [nationality, setNationality] = useState(user?.profile?.nationality || '');
  const [alert, setAlert] = useState(defaultAlert);
  const [showAlert, setShowAlert] = useState(true);
  const [status, setStatus] = useState();
  const [file, setFile] = useState();

  const avatar = (firstName || lastName) ? `${firstName[0]}${lastName[0]}`.toUpperCase() : '@';

  const handleProfilePhoto = e => {
    const files = e?.target?.files;
    const file = files[0];
    if (!/^image\//.test(file.type)) {
      setAlert({ type: 'err', message: 'Only images are allowed to be set as profile picture!' });
    } else {
      const photo = window.URL.createObjectURL(file);
      setPhoto(photo);
      setFile(file);
    }
  };
  const handleLoadImageError = () => {
    setPhoto(undefined);
  };
  const handlefirstName = e => {
    const value = e?.target.value;
    setFirstName(value);
  };
  const handlelastName = e => {
    const value = e?.target.value;
    setLastName(value);
  };
  const handleAge = e => {
    const value = e?.target.value;
    setAge(value);
  };
  const handleDbf = e => {
    const value = e?.target.value;
    setDbf(value);
  };
  const handleGender = e => {
    const value = e?.target.value;
    setGender(value);
  };
  const handlemStatus = e => {
    const value = e?.target.value;
    setmStatus(value);
  };
  const handleNationality = e => {
    const value = e?.target.value;
    setNationality(value);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleShowAlert = data => {
    setAlert(data || defaultAlert);
    setShowAlert(true);
  };

  const handleProfileUpadate = e => {
    e.preventDefault();
    setStatus('pending');
    upload(file, (err, data) => {
      if (err) {
        handleShowAlert({ type: 'err', message: 'Something went wrong while trying to upload. please try again latter' });
      } else {
        const profileObj = {
          photo: data.url || photo,
          first_name: firstName,
          last_name: lastName,
          age,
          gender: gender.toUpperCase(),
          date_of_birth: dbf,
          marital_status: mStatus,
          nationality,
        };
        updateProfile(axios, profileObj, (err, data) => {
          if (err) {
            setStatus('fail');
            const resScode = err?.response?.status;
            if (resScode === 400 || resScode === 409) {
              handleShowAlert({ type: 'err', message: err?.response?.data?.error?.message });
            } else {
              handleShowAlert({ type: 'err', message: 'Something went wrong. please try again latter' });
            }
          } else {
            setAppState(prev => ({ ...prev, user: data.user }));
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
          <h4 className="mb-3">Complete profile</h4>
          <form className="needs-validation" noValidate onSubmit={handleProfileUpadate}>
            <div className="row g-3">
              <div className="col-12 d-flex justify-content-center align-items-center">
                <div className="profile-img-container mt-5">
                  <label htmlFor="profilePhoto">
                    <input onChange={handleProfilePhoto} type="file" name="profilePhoto" id="profilePhoto" className="d-none" accept="image/*" />
                    <div className="upload-btn-fp d-flex justify-content-center align-items-center">
                      <span>Upload</span>
                    </div>
                    {photo ? (
                      <img className="profile-image" src={photo} alt="profile" onError={handleLoadImageError} />
                    ) : (
                      <div className="profile-image d-flex justify-content-center align-items-center">
                        <span>{avatar}</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input onChange={handlefirstName} type="text" value={firstName} className="form-control" id="firstName" name="firstName" placeholder="First name" required />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>

              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input onChange={handlelastName} type="text" value={lastName} className="form-control" id="lastName" name="lastName" placeholder="Last name" required />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label">Age</label>
                <input onChange={handleAge} type="number" value={age} className="form-control" id="age" name="age" placeholder="Age" required />
                <div className="invalid-feedback">
                  Please enter valid age
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="address" className="form-label">Date of birth</label>
                <input onChange={handleDbf} type="date" className="form-control" value={dbf} id="dbf" name="dbf" required />
                <div className="invalid-feedback">
                  Please select a valid date of bith
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="country" className="form-label">Gender</label>
                <select onChange={handleGender} value={gender} className="form-select" id="gender" name="gender" required>
                  <option value="">Choose...</option>
                  <option>MALE</option>
                  <option>FEMALE</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid gender
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="state" className="form-label">Marital status</label>
                <select onChange={handlemStatus} value={mStatus} className="form-select" id="mStatus" name="mStatus" required>
                  <option value="">Choose...</option>
                  <option>SINGLE</option>
                  <option>MARRIED</option>
                  <option>DIVORCED</option>
                  <option>WIDOWED</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid Marital status
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="nationality" className="form-label">Nationality</label>
                <input onChange={handleNationality} type="text" value={nationality} className="form-control" id="nationality" name="nationality" placeholder="Nationality" required />
                <div className="invalid-feedback">
                  Valid nationality is required
                </div>
              </div>
            </div>

            <Button label="Save" classes="primary-button mt-3" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
