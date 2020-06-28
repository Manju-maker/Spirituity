import user from '../saga/user';
import category from '../saga/category';

import {all, fork} from 'redux-saga/effects';

export default function* root() {
  yield all([fork(user), fork(category)]);
}
