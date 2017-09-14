import {
  GOT_CATEGORIES,
} from '../actions/category';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_CATEGORIES:
      return {
        ...state,
        ...action.categories,
      }
    default:
      return state;
  }
}

export default reducer;
