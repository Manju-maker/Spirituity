import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer } from './reducer/reducer';
import rootsaga from '../Store/saga/index';
const rootReducer = combineReducers({ reducer });
const sagaMiddleware = createSagaMiddleware();
const Store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootsaga);
export default Store;