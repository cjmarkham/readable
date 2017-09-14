import * as API from '../utils/api';

export const GOT_CATEGORIES = 'GOT_CATEGORIES';

export const gotCategories = categories => ({
  type: GOT_CATEGORIES,
  categories,
});


export const getCategories = () => dispatch => (
  API.getCategories()
     .then(categories => dispatch(gotCategories(categories)))
)
