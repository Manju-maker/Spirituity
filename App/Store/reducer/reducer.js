import {
  OTP_REQUEST_STATUS, /// checked
  SHOW_LOADING,
  LOGIN_STATUS,
  RESEND_OTP_SUCCESS,
  RESND_OTP_FAILED,
  LOGIN_REQUEST_MOBILE_STATUS, /// checked
  RESTE_OTP_RESPONSE, //// checked
  FORGOT_PASSWORD_STATUS, /// checked
  FORGET_OTP_REQUEST_STATUS, /// CHECKED
  FORGET_VIA_OTP_STATUS,
  ALL_CATEGORY,
} from '../../utils/constant';
import {act} from 'react-test-renderer';
let initialState = {
  user: '',
  isLoading: false,
  otpResponse: null, //// checked
  allCategory: [],
  signupResponse: null,
  loginResponse: null,
  resendOtpResponse: null,
  verifyOtpResoponse: null,
  signResponseViaOtp: null,
  forgetResponse: null,
};

export const reducer = (state = initialState, action) => {
  console.log('state>>>action>>>>>>>>>>>>', action.type, 'payload', action);
  switch (action.type) {
    case RESTE_OTP_RESPONSE: //// checked
      return {...state, otpResponse: null};
    case LOGIN_STATUS:
      return {...state, loginResponse: action.payload};

    case ALL_CATEGORY:
      return {...state, allCategory: action.payload};
    // case LOGIN_FAILED:
    //   return {...state, loginResponse: action.payload};
    case FORGET_VIA_OTP_STATUS:
      return {...state, loginResponse: action.payload};
    case OTP_REQUEST_STATUS: //checked   ----- done
      return {...state, otpResponse: action.payload};
    case FORGOT_PASSWORD_STATUS: ///// checked --- done
      return {...state, forgetResponse: action.payload};
    case SHOW_LOADING:
      return {...state, isLoading: action.payload};
    case RESND_OTP_FAILED:
      return {...state, resendOtpResponse: action.payload};
    case RESEND_OTP_SUCCESS:
      return {...state, resendOtpResponse: action.payload};
    case LOGIN_REQUEST_MOBILE_STATUS: //// checked    ---- done
      return {...state, signResponseViaOtp: action.payload};
    case FORGET_OTP_REQUEST_STATUS:
      return {...state, forgetOtpResponse: action.payload};
    default:
      return state;
  }
};
