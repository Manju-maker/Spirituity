import {
  SHOW_LOADING,
  LOGIN_STATUS,
  UPDATE_USER_DATA_SUCCESS,
} from '../../utils/constant';
let initialState = {
  isLoading: false,
  loginResponse: null,
  
};

export default User = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_STATUS:
      return {...state, loginResponse: action.payload};

    case SHOW_LOADING:
      return {...state, isLoading: action.payload};

    case UPDATE_USER_DATA_SUCCESS:
      return {
        ...state,
        loginResponse: {
          ...state.loginResponse,
          data: {...state.loginResponse.data, ...action.payload},
        },
      };
    default:
      return state;
  }
};
