import {
  LOGIN_SUCCESS, /// checked
  LOGIN_REQUEST,
  GET_OTP, //// checked
  SHOW_LOADING,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_MOBILE, ///// checked
  RESEND_OTP,
  FORGOT_PASSWORD_REQUEST,
  LOGIN_REQUEST_MOBILE, /// checked
  RESTE_OTP_RESPONSE, //// checked
  LOGIN_STATUS, //// checked
  GET_OTP_FORGET,
  FORGET_VIA_OTP
} from '../../utils/constant';

const forgetViaOtp = payload => {
  return {
    type: FORGET_VIA_OTP,
    payload,
  };
};

const getOtpForFoget = payload => {
  return {
    type: GET_OTP_FORGET,
    payload,
  };
};
const resetOtpResponse = () => {
  //// checked
  return {
    type: RESTE_OTP_RESPONSE,
    payload: null,
  };
};

const login = payload => {
  /// checked
  return {
    type: LOGIN_STATUS,
    payload,
  };
};

const getOtp = payload => {
  //// checked
  return {
    type: GET_OTP,
    payload,
  };
};

const isLoading = payload => {
  return {
    type: SHOW_LOADING,
    payload,
  };
};
const OtpVerifyAndSignup = payload => {
  return {
    type: SIGNUP_REQUEST_MOBILE, ////checked
    payload,
  };
};

const signinViaEmail = payload => {
  return {
    type: LOGIN_REQUEST,
    payload,
  };
};
const forgot = payload => {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    payload,
  };
};

const resendOtp = payload => {
  return {
    type: RESEND_OTP,
    payload,
  };
};
const signinViaOtp = payload => {
  //// checked
  return {
    type: LOGIN_REQUEST_MOBILE,
    payload,
  };
};

const updatePassword = () => {};
export {
  forgetViaOtp,
  getOtpForFoget,
  resetOtpResponse,
  login,
  getOtp,
  isLoading,
  OtpVerifyAndSignup,
  signinViaEmail,
  resendOtp,
  forgot,
  signinViaOtp,
};
