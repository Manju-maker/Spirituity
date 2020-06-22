import {all, put, takeLatest, call} from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  OTP_REQUEST_STATUS, /// chedked
  SIGNUP_REQUEST_MOBILE, /// checked
  GET_OTP, /// checked
  SHOW_LOADING,
  RESEND_OTP_SUCCESS,
  RESND_OTP_FAILED,
  RESEND_OTP,
  FORGOT_PASSWORD_STATUS,
  FORGOT_PASSWORD_REQUEST,
  LOGIN_REQUEST_MOBILE_STATUS, //// checked   //// Checked
  LOGIN_REQUEST_MOBILE, /// checked
  LOGIN_STATUS, /// checked
  GET_OTP_FORGET, //// checked
  FORGET_OTP_REQUEST_STATUS, /// checked
  FORGET_VIA_OTP, /// checked
  FORGET_VIA_OTP_STATUS, /// checked
} from '../../utils/constant';
import CallApi from '../../utils/callApi';

let headers = {
  'content-type': 'application/json',
  token: 'jj2njndejn1oi3ien3ndono11inn3nfy8r7',
};

export function* loginViaEmail(payload) {
  try {
    yield put({type: SHOW_LOADING, payload: true});
    const response = yield call(
      CallApi,
      'post',
      'users/signin',
      payload.payload,
      headers,
    );
    yield put({type: LOGIN_STATUS, payload: response.data});
  } catch (err) {
    yield put({type: SHOW_LOADING, payload: false});
    yield put({
      type: LOGIN_STATUS,
      payload: {data: err.response.data, status: err.response.status},
    });
  }
}

export function* getOtp(payload) {
  //// checked >>>
  try {
    yield put({type: SHOW_LOADING, payload: true});
    const response = yield call(
      CallApi,
      'post',
      'users/otp',
      payload.payload,
      headers,
    );
    yield put({type: OTP_REQUEST_STATUS, payload: response.data});
  } catch (err) {
    yield put({type: SHOW_LOADING, payload: false});
    yield put({
      type: OTP_REQUEST_STATUS,
      payload: {data: err.response.data, status: err.response.status},
    });
  }
}
export function* signupViaOtp(payload) {
  ///// done
  //// checked
  try {
    yield put({type: SHOW_LOADING, payload: true});
    const response = yield call(
      CallApi,
      'post',
      'users/signup',
      payload.payload,
      headers,
    );
    console.log(response);
    yield put({type: LOGIN_REQUEST_MOBILE_STATUS, payload: {Success: true}});
  } catch (err) {
    yield put({type: SHOW_LOADING, payload: false});
    yield put({
      type: LOGIN_REQUEST_MOBILE_STATUS,
      payload: {data: err.response.data, status: err.response.status},
    });
  }
}
export function* resendOtp(payload) {
  try {
    yield put({type: SHOW_LOADING, payload: true});
    const response = yield call(
      CallApi,
      'put',
      'users/otp/resend',
      payload.payload,
      headers,
    );
    yield put({type: RESEND_OTP_SUCCESS, payload: response.data});
  } catch (error) {
    yield put({type: SHOW_LOADING, payload: false});
    yield put({
      type: RESND_OTP_FAILED,
      payload: {data: error.response.data, status: error.response.status},
    });
  }
}

export function* forgot(payload) {
  //// checked --- done
  try {
    console.log('poyload of payloadd>>>', payload);
    yield put({type: SHOW_LOADING, payload: true});
    const response = yield call(
      CallApi,
      'post',
      'users/reset-password/email',
      payload.payload,
      headers,
    );
    console.log(
      'responseresponseresponseresponseresponseresponseresponseresponseresponseresponse email ',
      response.data,
    );
    yield put({type: FORGOT_PASSWORD_STATUS, payload: response.data});
  } catch (err) {
    yield put({type: SHOW_LOADING, payload: false});
    yield put({
      type: FORGOT_PASSWORD_STATUS,
      payload: {data: err.response.data, status: err.response.status},
    });
  }
}
export function* loginViaOtp(payload) {
  //// checked
  try {
    console.log('loginVia OTP', payload);
    yield put({type: SHOW_LOADING, payload: true});
    const response = yield call(
      CallApi,
      'post',
      'users/signin/otp-verify',
      payload.payload,
      headers,
    );
    yield put({type: LOGIN_REQUEST_MOBILE_STATUS, payload: response.data});
  } catch (err) {
    yield put({type: SHOW_LOADING, payload: false});
    yield put({
      type: LOGIN_REQUEST_MOBILE_STATUS,
      payload: {data: err.response.data, status: err.response.status},
    });
  }
}
export function* getOtpForget(payload) {
  try {
    yield put({type: SHOW_LOADING, payload: true});
    const response = yield call(
      CallApi,
      'post',
      'users/otp',
      payload.payload,
      headers,
    );
    yield put({type: FORGET_OTP_REQUEST_STATUS, payload: response.data});
  } catch (error) {
    yield put({type: SHOW_LOADING, payload: true});
    yield put({
      type: FORGET_OTP_REQUEST_STATUS,
      payload: {data: err.response.data, status: err.response.status},
    });
  }
}

export function* forgetViaOtp(payload) {
  ///// update as u get route
  try {
    yield put({type: SHOW_LOADING, payload: true});
    const response = yield call(
      CallApi,
      'post',
      'users/otp',
      payload.payload,
      headers,
    );
    yield put({type: FORGET_VIA_OTP_STATUS, payload: response.data});
  } catch (error) {
    yield put({type: SHOW_LOADING, payload: true});
    yield put({type: FORGET_VIA_OTP_STATUS, payload: error.response.data});
  }
}
export default function* root() {
  yield all([
    takeLatest(LOGIN_REQUEST, loginViaEmail), //// hcecked ---- done
    takeLatest(LOGIN_REQUEST_MOBILE, loginViaOtp), /// checked
    takeLatest(GET_OTP, getOtp), ////// done checked
    takeLatest(SIGNUP_REQUEST_MOBILE, signupViaOtp), //// checked   ---- done
    takeLatest(RESEND_OTP, resendOtp),
    takeLatest(FORGOT_PASSWORD_REQUEST, forgot), //// checked ---- done
    takeLatest(GET_OTP_FORGET, getOtpForget), /// checked
    takeLatest(FORGET_VIA_OTP, forgetViaOtp), /// checked
  ]);
}
