export default {
  login_api: '/user/login',
  refresh_token_api: '/user/refresh-token',
  admin_login_api: '/user/admin/login',
  signup_api: '/user/signup',
  logout_api: 'user/logout',
  get_all_users_api: '/user/allusers',
  r_psw_rese_api: '/user/request-password-reset',
  r_r_psw_rese_api: '/user/resend-password-reset',
  apply_psw_reset_api: session => `/user/apply-password-reset/${session}`,
  verify_user_api: session => `/user/activateuser/${session}`,
  resend_verification_api: '/user/resendverification',
  my_profile_api: '/user/myprofile',
};
