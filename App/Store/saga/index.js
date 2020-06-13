import user from '../saga/user';

import { all, fork } from "redux-saga/effects";

export default function* root() {
    yield all([
        fork(user)
    ])

}