import {all, put, takeLatest, call} from 'redux-saga/effects';
import {SHOW_LOADING, GET_CATEGORY, ALL_CATEGORY} from '../../utils/constant';
import CallApi from '../../utils/callApi';

let headers = {
  'content-type': 'application/json',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiI3NjE4NDAzNTk5IiwiZW1haWwiOiJtYW5qdUBnbWFpbC5jb20iLCJyb2xlX25hbWUiOiJVU0VSIiwiaWF0IjoxNTkzMDU5OTk0LCJleHAiOjE1OTU2NTE5OTR9.RO7Og3eYXUsz4BiTiK498oMpA5Kg6KpqWi_NM-re9Bk',
};

export function* getCategory() {
  try {
    // yield put({type: SHOW_LOADING, payload: true});
    const response = yield call(
      CallApi,
      'get',
      'users/home/categories',
      {},
      headers,
    );
    let data = response.data.response;
    yield put({type: ALL_CATEGORY, payload: data});
  } catch (err) {
    // yield put({type: SHOW_LOADING, payload: false});
    console.log('errrrr>>>>>>>', err);
  }
}

export default function* root() {
  yield all([takeLatest(GET_CATEGORY, getCategory)]);
}
