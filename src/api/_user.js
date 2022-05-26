/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import axios from './_axios';
import { Constants } from '../helpers';

const {
  verify_user_api,
  resend_verification_api,
  r_psw_rese_api,
  r_r_psw_rese_api,
  apply_psw_reset_api,
  my_profile_api,
} = Constants;

export const verifyUser = async (token, callback) => {
  try {
    const { data } = await axios.put(verify_user_api(token));
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const resentVerification = async (email, callback) => {
  try {
    const { data } = await axios.post(resend_verification_api, { email });
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};
export const passwordReset = async (info, callback) => {
  try {
    const { data } = await axios.post(r_psw_rese_api, info);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const resendPasswordReset = async (info, callback) => {
  try {
    const { data } = await axios.post(r_r_psw_rese_api, info);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const applyPasswordReset = async (info, session, callback) => {
  try {
    const { data } = await axios.put(apply_psw_reset_api(session), info);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const getMyProfile = async (axios, callback) => {
  try {
    const { data } = await axios.get(my_profile_api);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};
