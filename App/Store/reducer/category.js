import {ALL_CATEGORY} from '../../utils/constant';
let initialState = {
  allCategory: [],
};

export default Category = (state = initialState, action) => {
  switch (action.type) {
    case ALL_CATEGORY:
      return {...state, allCategory: action.payload};

    default:
      return state;
  }
};
