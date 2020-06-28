import {
  SHOW_LOADING,
  LOGIN_STATUS,
  GET_CATEGORY,
  UPDATE_USER_DATA,
} from '../../utils/constant';

const getCategory = () => {
  return {
    type: GET_CATEGORY,
  };
};

const login = payload => {
  return {
    type: LOGIN_STATUS,
    payload,
  };
};

const isLoading = payload => {
  return {
    type: SHOW_LOADING,
    payload,
  };
};

const updateUserInfo = (payload, headers) => {
  return {type: UPDATE_USER_DATA, payload, headers};
};

export {getCategory, login, isLoading, updateUserInfo};
