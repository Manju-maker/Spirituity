import {
  LOGIN_REQUEST,
  GET_OTP, //// checked
  SHOW_LOADING,
  SIGNUP_REQUEST_MOBILE, ///// checked
  RESEND_OTP,
  FORGOT_PASSWORD_REQUEST,
  LOGIN_REQUEST_MOBILE, /// checked
  RESTE_OTP_RESPONSE, //// checked
  LOGIN_STATUS, //// checked
  GET_OTP_FORGET,
  FORGET_VIA_OTP,
  GET_CATEGORY,
} from '../../utils/constant';

const getCategory = () => {
  return {
    type: GET_CATEGORY,
  };
};

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
    type: SIGNUP_REQUEST_MOBILE, ////checked   ---- done
    payload,
  };
};

const signinViaEmail = payload => {
  //// checked ----- done
  return {
    type: LOGIN_REQUEST,
    payload,
  };
};
const forgot = payload => {
  //// checked ----- done
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
  //// checked    ----- done
  return {
    type: LOGIN_REQUEST_MOBILE,
    payload,
  };
};

const updatePassword = () => {};
export {
  getCategory,
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
