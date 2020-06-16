import {
  LOGIN_FAILED,
  OTP_REQUEST_STATUS, /// checked
  OTP_REQUEST_SUCCESS,
  OTP_REQUEST_FAILED,
  SHOW_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_SUCCESSS,
  LOGIN_STATUS,
  RESEND_OTP_SUCCESS,
  RESND_OTP_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  LOGIN_REQUEST_MOBLE_STATUS, /// checked
  RESTE_OTP_RESPONSE, //// checked
  FORGOT_PASSWORD_STATUS,  /// checked
  FORGET_OTP_REQUEST_STATUS
} from '../../utils/constant';
let initialState = {
  user: '',
  isLoading: false,
  otpResponse: null, //// checked
  signupResponse: null,
  loginResponse: null,
  resendOtpResponse: null,
  forgotEmailResponse: null,
  verifyOtpResoponse: null,
  signResponseViaOtp: null,
  forgetOtpResponse: null,
};

export const reducer = (state, action) => {
  state = initialState;
  console.log('state>>>action>>>>>>>>>>>>', action);
  switch (action.type) {
    case RESTE_OTP_RESPONSE: //// checked
      return {...state, otpResponse: null};
    case LOGIN_STATUS:
      return {...state, loginResponse: action.payload};
    // case LOGIN_FAILED:
    //   return {...state, loginResponse: action.payload};
    case OTP_REQUEST_STATUS: //checked
      return {...state, otpResponse: action.payload};
    case FORGOT_PASSWORD_STATUS:
      return {...state, forgotEmailResponse: action.payload};
    case SHOW_LOADING:
      return {...state, isLoading: action.payload};
    case RESND_OTP_FAILED:
      return {...state, resendOtpResponse: action.payload};
    case RESEND_OTP_SUCCESS:
      return {...state, resendOtpResponse: action.payload};
    case LOGIN_REQUEST_MOBLE_STATUS: //// checked
      return {...state, signResponseViaOtp: action.payload};
    case FORGET_OTP_REQUEST_STATUS:
      return {...state, forgetOtpResponse: action.payload};
    default:
      return state;
  }
};
