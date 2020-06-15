import {all, put, takeLatest, call} from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  GET_OTP,
  OTP_REQUEST_SUCCESS,
  OTP_REQUEST_FAILED,
  SHOW_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_FAILED,
  LOGIN_SUCCESSS,
  RESEND_OTP_SUCCESS,
  RESND_OTP_FAILED,
  RESEND_OTP,
} from '../../utils/constant';
import CallApi from '../../utils/callApi';
import {yellow} from 'color-name';

let headers = {
  'content-type': 'application/json',
  token: 'jj2njndejn1oi3ien3ndono11inn3nfy8r7',
};

export function* login(payload) {
  try {
    yield put({type: SHOW_LOADING, payload: true});
    const response = yield call(
      CallApi,
      'post',
      'users/signin',
      payload.payload,
      headers,
    );
    yield put({type: LOGIN_SUCCESSS, payload: response.data});
  } catch (err) {
    yield put({type: SHOW_LOADING, payload: false});
    yield put({
      type: LOGIN_FAILED,
      payload: {data: err.response.data, status: err.response.status},
    });
  }
}

export function* getOtp(payload) {
  try {
    yield put({type: SHOW_LOADING, payload: true});
    const response = yield call(
      CallApi,
      'post',
      'users/otp',
      payload.payload,
      headers,
    );
    yield put({type: OTP_REQUEST_SUCCESS, payload: response.data});
  } catch (err) {
    yield put({type: SHOW_LOADING, payload: false});
    yield put({
      type: OTP_REQUEST_FAILED,
      payload: {data: err.response.data, status: err.response.status},
    });
  }
}
export function* signup(payload) {
  try {
    yield put({type: SHOW_LOADING, payload: true});
    const response = yield call(
      CallApi,
      'post',
      'users/signup',
      payload.payload,
      headers,
    );
    yield put({type: SIGNUP_SUCCESS, payload: {Success: true}});
  } catch (err) {
    yield put({type: SHOW_LOADING, payload: false});
    yield put({
      type: SIGNUP_FAILED,
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

export default function* root() {
  yield all([
    takeLatest(LOGIN_REQUEST, login),
    takeLatest(GET_OTP, getOtp),
    takeLatest(SIGNUP_REQUEST, signup),
    takeLatest(RESEND_OTP, resendOtp),
  ]);
}
