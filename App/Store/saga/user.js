import {all, put, takeLatest, call} from 'redux-saga/effects';
import {
  SHOW_LOADING,
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_SUCCESS,
} from '../../utils/constant';
import {showSnackBar} from '../../Components/snackbar';
import CallApi from '../../utils/callApi';

export function* updateUserData(payload) {
  try {
    console.log('Call Received for update data ?????>>>>', payload);
    const response = yield call(
      CallApi,
      'put',
      'auth/users/profile',
      payload.payload,
      payload.headers,
    );
    console.log('after response from Server>>>', response.status);
    const getData = yield call(
      CallApi,
      'get',
      'users/home/profile',
      {},
      payload.headers,
    );
    if (getData.status === 200) {
      showSnackBar({message: 'Data Updated Successfully.'});
    }
    yield put({type: UPDATE_USER_DATA_SUCCESS, payload: getData.data.response});
  } catch (err) {
    let {data, status} = err.response || {};
    console.log("error >>>>>>>",data)
    if (status === 401) {
      showSnackBar({
        message: 'Password is not Valid.',
      });
    } else if (err.message === 'Network Error') {
      showSnackBar({
        message: 'Internet connection is required to proceed',
      });
    }
  }
}

export default function* root() {
  yield all([takeLatest(UPDATE_USER_DATA, updateUserData)]);
}
