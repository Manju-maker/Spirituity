import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  OTP_REQUEST_SUCCESS,
  OTP_REQUEST_FAILED,
  SHOW_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_SUCCESSS,
} from '../../utils/constant';
let initialState = {
  user: '',
  token: null,
  isLoading: false,
  otpResponse: null,
  signupResponse: null,
};

export const reducer = (state, action) => {
  state = initialState;
  console.log('state>>>action>>>>>>>>>>>>', action);
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, token: action.payload};
    case LOGIN_SUCCESSS:
      return {...state, signupResponse: action.payload};
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
    default:
      return state;
  }
};
