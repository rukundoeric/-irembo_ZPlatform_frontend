/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import axios from './_axios';
import { Constants } from '../helpers';

const {
  login_api,
  signup_api,
  refresh_token_api,
  google_auth_api,
  second_factor_auth,
  resend_one_time_password,
  validate_login_token,
  login_with_token,
} = Constants;

export const signUp = async (user, callback) => {
  try {
    const { data } = await axios.post(signup_api, user);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const logIn = async (auth, callback) => {
  try {
    const { data } = await axios.post(login_api, auth);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const logInSecondFactorAuth = async (auth, callback) => {
  try {
    const { data } = await axios.post(second_factor_auth, auth);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const logInWithAccessToken = async (auth, callback) => {
  try {
    const { data } = await axios.post(login_with_token, auth);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const resentOneTimePassword = async (info, callback) => {
  try {
    const { data } = await axios.post(resend_one_time_password, info);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const refreshToken = async () => {
  const { data } = await axios.get(refresh_token_api);
  return { ...data, status: 'success' };
};

export const googleAuth = async (info, callback) => {
  try {
    const { data } = await axios.post(google_auth_api, info);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const turnOnOrOffSecondFactorAuth = async (axios, info, callback) => {
  try {
    const { data } = await axios.put(second_factor_auth, info);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const validateLoginToken = async (axios, info, callback) => {
  try {
    const { data } = await axios.put(validate_login_token, info);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};
