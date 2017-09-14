import {
  GOT_POSTS,
  GOT_POST,
  VOTED_POST,
  CREATED_POST,
  EDITED_POST,
  DELETED_POST,
} from '../actions/post';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_POSTS:
      const { posts } = action;

      return {
        ...state,
        posts: posts.filter(p => ! p.deleted),
      }
    case GOT_POST:
      const { post } = action;

      return {
        ...state,
        post,
      }
    case VOTED_POST:
      let stateObject = {};
      if (state.posts) {
        stateObject.posts = state.posts.filter(p => p.id !== action.post.id).concat(action.post);
      }
      if (state.post) {
        stateObject.post = action.post;
      }

      return {
        ...state,
        ...stateObject,
      }
    case CREATED_POST:
    case EDITED_POST:
      return {
        ...state,
        reload: true,
        post: action.post,
      }
    case DELETED_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postId),
      }
    default:
      return state;
  }
}

export default reducer;
