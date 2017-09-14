import * as API from '../utils/api';
import sortBy from 'sort-by';

export const GOT_COMMENTS    = 'GOT_COMMENTS';
export const GOT_COMMENT     = 'GOT_COMMENT';
export const VOTED_COMMENT   = 'VOTED_COMMENT';
export const CREATED_COMMENT = 'CREATED_COMMENT';
export const DELETED_COMMENT = 'DELETED_COMMENT';
export const EDITED_COMMENT  = 'EDITED_COMMENT';

export const gotComments = comments => ({
  type: GOT_COMMENTS,
  comments,
});

export const gotComment = comment => ({
  type: GOT_COMMENT,
  comment,
});

export const votedComment = comment => ({
  type: VOTED_COMMENT,
  comment,
});

export const createdComment = comment => ({
  type: CREATED_COMMENT,
  comment,
});

export const editedComment = comment => ({
  type: EDITED_COMMENT,
  comment,
});

export const deletedComment = commentId => ({
  type: DELETED_COMMENT,
  commentId,
});

export const getComments = (postId, sortAttr, sortDir) => dispatch => {
  if ( ! sortAttr) {
    sortAttr = 'voteScore';
  }
  if ( ! sortDir) {
    sortDir = 'desc';
  }
  let sort = sortAttr;
  if (sortDir === 'desc') {
    sort = `-${sort}`;
  }

  API.getComments(postId)
     .then(comments => dispatch(gotComments(comments.sort(sortBy(sort)))))
}

export const getComment = commentId => dispatch => (
  API.getComment(commentId)
     .then(comment => dispatch(gotComment(comment)))
)

export const voteCommentUp = commentId => dispatch => (
  API.voteComment(commentId, 'upVote')
     .then(comment => dispatch(votedComment(comment)))
)

export const voteCommentDown = commentId => dispatch => (
  API.voteComment(commentId, 'downVote')
     .then(comment => dispatch(votedComment(comment)))
)

export const createComment = params => dispatch => (
  API.createComment(params)
     .then(comment => dispatch(createdComment(comment)))
)

export const deleteComment = commentId => dispatch => (
  API.deleteComment(commentId)
     .then(commentId => dispatch(deletedComment(commentId)))
)

export const editComment = (commentId, params) => dispatch => (
  API.editComment(commentId, params)
     .then(comment => dispatch(editedComment(comment)))
)
