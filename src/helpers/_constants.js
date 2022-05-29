/* eslint-disable camelcase */
export default {
  // auth
  login_api: '/auth/login',
  second_factor_auth: '/auth/second-factor-auth',
  refresh_token_api: '/auth/refresh-token',
  logout_api: '/auth/logout',

  // User
  signup_api: '/user/signup',
  verify_user_api: session => `/user/verify-email/${session}`,
  resend_verification_api: '/user/resend-email-verification',

  r_psw_rese_api: '/user/request-password-reset',
  apply_psw_reset_api: session => `/user/reset-password/${session}`,
  r_r_psw_rese_api: '/user/resend-password-reset-confirmation',

  // Profile
  my_profile_api: '/user/profile',
  update_profile: '/user/update-profile',
  r_account_verification: '/user/account-verification',

  // for admin
  get_a_v_requests: '/user/get-verify-account-requests',
  verify_account: request_id => `/user/verify-account/${request_id}`,

  // upload directories
  images_directory: '/upload',
};
