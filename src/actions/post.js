import * as API from '../utils/api';
import sortBy from 'sort-by';

export const GOT_POSTS    = 'GOT_POSTS';
export const GOT_POST     = 'GOT_POST';
export const CREATED_POST = 'CREATED_POST';
export const EDITED_POST  = 'EDITED_POST';
export const VOTED_POST   = 'VOTED_POST';
export const DELETED_POST = 'DELETED_POST';

export const gotPosts = posts => ({
  type: GOT_POSTS,
  posts,
});

export const gotPost = post => ({
  type: GOT_POST,
  post,
});

export const votedPost = post => ({
  type: VOTED_POST,
  post,
});

export const createdPost = post => ({
  type: CREATED_POST,
  post,
});

export const editedPost = post => ({
  type: EDITED_POST,
  post,
});

export const deletedPost = postId => ({
  type: DELETED_POST,
  postId,
});

export const getPosts = (categoryId, sortAttr, sortDir) => dispatch => {
  let sort = ! sortAttr ? 'voteScore' : sortAttr;
  sort = ! sortDir || sortDir === 'desc' ? `-${sort}` : sort;

  API.getPosts(categoryId)
     .then(posts => dispatch(gotPosts(posts.sort(sortBy(sort)))))
}

export const voteUp = postId => dispatch => (
  API.votePost(postId, 'upVote')
     .then(post => dispatch(votedPost(post)))
)

export const voteDown = postId => dispatch => (
  API.votePost(postId, 'downVote')
     .then(post => dispatch(votedPost(post)))
)

export const createPost = params => dispatch => (
  API.createPost(params)
     .then(post => dispatch(createdPost(post)))
)

export const editPost = (postId, params) => dispatch => (
  API.editPost(postId, params)
     .then(post => dispatch(editedPost(post)))
)

export const getPost = postId => dispatch => (
  API.getPost(postId)
     .then(post => dispatch(gotPost(post)))
)

export const deletePost = postId => dispatch => (
  API.deletePost(postId)
     .then(postId => dispatch(deletedPost(postId)))
)
