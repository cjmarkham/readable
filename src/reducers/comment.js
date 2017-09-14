import {
  GOT_COMMENT,
  GOT_COMMENTS,
  VOTED_COMMENT,
  CREATED_COMMENT,
  DELETED_COMMENT,
  EDITED_COMMENT,
} from '../actions/comment';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_COMMENTS:
      const { comments } = action;

      return {
        ...state,
        comments,
      }
    case GOT_COMMENT:
      return {
        ...state,
        comment: action.comment,
      }
    case DELETED_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(c => c.id !== action.commentId),
      }
    case CREATED_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.comment),
      }
    case EDITED_COMMENT:
      return {
        ...state,
        reload: true,
        comment: action.comment,
      }
    case VOTED_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(c => c.id !== action.comment.id).concat(action.comment),
      }
    default:
      return state;
  }
}

export default reducer;
