import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import User from './reducer/user';
import Category from "./reducer/category"
import rootsaga from '../Store/saga/index';
const rootReducer = combineReducers({User, Category});
const sagaMiddleware = createSagaMiddleware();
const Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootsaga);
export default Store;
