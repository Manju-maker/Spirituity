import {all, put, takeLatest, call} from 'redux-saga/effects';
import {SHOW_LOADING, GET_CATEGORY} from '../../utils/constant';
import CallApi from '../../utils/callApi';

let headers = {
  'content-type': 'application/json',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiI3NjE4NDAzNTk5IiwiZW1haWwiOiJtYW5qdUBnbWFpbC5jb20iLCJyb2xlX25hbWUiOiJVU0VSIiwiaWF0IjoxNTkyOTY1MzQxLCJleHAiOjE1OTU1NTczNDF9.t4evtCTHukS-2xcUmkMazj1hQNkNutYORsyQZgcyukw',
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
    console.log('ressssssssssssss>>>>>>>', response.data.response);
  } catch (err) {
    // yield put({type: SHOW_LOADING, payload: false});
    console.log('errrrr>>>>>>>', err.response.data);
  }
}

export default function* root() {
  yield all([takeLatest(GET_CATEGORY, getCategory)]);
}
