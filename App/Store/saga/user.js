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
} from '../../utils/constant';
import CallApi from '../../utils/callApi';

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
    console.log('responseeeeeee of loginnnnnnnnn>>', response);
  } catch (err) {
    console.log('Login inside try err of login', err.response);
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
    console.log('responseeee of get otppp>>>>>>>>>>>>>>>>>>>>>', response);
    yield put({type: OTP_REQUEST_SUCCESS, payload: response.data});
  } catch (err) {
    yield put({type: SHOW_LOADING, payload: false});
    console.log('errr>>>>', err.response);
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
    console.log('responseeeee of signupppppppppppppppp', response);

    yield put({type: SIGNUP_SUCCESS, payload: {Success: true}});
  } catch (err) {
    console.log('err of signup', err.response);
    yield put({type: SHOW_LOADING, payload: false});
    yield put({
      type: SIGNUP_FAILED,
      payload: {data: err.response.data, status: err.response.status},
    });
  }
}
export default function* root() {
  yield all([
    takeLatest(LOGIN_REQUEST, login),
    takeLatest(GET_OTP, getOtp),
    takeLatest(SIGNUP_REQUEST, signup),
  ]);
}
