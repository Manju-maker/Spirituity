import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  OTP_REQUEST_SUCCESS,
  OTP_REQUEST_FAILED,
  SHOW_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_SUCCESSS,
  RESEND_OTP_SUCCESS,
  RESND_OTP_FAILED,
} from '../../utils/constant';
let initialState = {
  user: '',
  isLoading: false,
  otpResponse: null,
  signupResponse: null,
  loginResponse: null,
  resendOtpResponse: null,
};

export const reducer = (state, action) => {
  state = initialState;
  console.log('state>>>action>>>>>>>>>>>>', action);
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, token: action.payload};
    case LOGIN_SUCCESSS:
      return {...state, loginResponse: action.payload};
    case LOGIN_FAILED:
      return {...state, signupResponse: action.payload};
    case OTP_REQUEST_SUCCESS:
      return {...state, otpResponse: action.payload};
    case OTP_REQUEST_FAILED:
      return {...state, otpResponse: action.payload};
    case SIGNUP_SUCCESS:
      return {...state, signupResponse: action.payload};
    case SIGNUP_FAILED:
      return {...state, signupResponse: action.payload};
    case SHOW_LOADING:
      return {...state, isLoading: action.payload};
    case RESND_OTP_FAILED:
      return {...state, resendOtpResponse: action.payload};
    case RESEND_OTP_SUCCESS:
      return {...state, resendOtpResponse: action.payload};
    default:
      return state;
  }
};
