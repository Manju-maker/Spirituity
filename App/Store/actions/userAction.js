import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  GET_OTP,
  SHOW_LOADING,
  SIGNUP_REQUEST,
} from '../../utils/constant';

const login = payload => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};
const isLogin = payload => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

const getOtp = payload => {
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
    type: SIGNUP_REQUEST,
    payload,
  };
};

const signinViaEmail = payload => {
  return {
    type: LOGIN_REQUEST,
    payload,
  };
};

export {login, isLogin, getOtp, isLoading, OtpVerifyAndSignup, signinViaEmail};
