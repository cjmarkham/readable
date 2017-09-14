const BASE_URL = 'http://localhost:5001';
const DEFAULT_HEADERS = {
  'Authorization': 'Foobar',
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export const getCategories = () => fetch(`${BASE_URL}/categories`, { headers: DEFAULT_HEADERS }).then(json => json.json());

export const getComment    = commentId => fetch(`${BASE_URL}/comments/${commentId}`, { headers: DEFAULT_HEADERS }).then(json => json.json());
export const getComments   = postId => fetch(`${BASE_URL}/posts/${postId}/comments`, { headers: DEFAULT_HEADERS }).then(json => json.json());
export const voteComment   = (commentId, upOrDown) => fetch(`${BASE_URL}/comments/${commentId}`, { headers: DEFAULT_HEADERS, method: 'POST', body: JSON.stringify({option: upOrDown}) }).then(json => json.json());
export const createComment = params => fetch(`${BASE_URL}/comments`, { headers: DEFAULT_HEADERS, method: 'POST', body: JSON.stringify(params) }).then(json => json.json());
export const editComment   = (commentId, params) => fetch(`${BASE_URL}/comments/${commentId}`, { headers: DEFAULT_HEADERS, method: 'PUT', body: JSON.stringify(params) }).then(json => json.json());
export const deleteComment = commentId => fetch(`${BASE_URL}/comments/${commentId}`, { headers: DEFAULT_HEADERS, method: 'DELETE' }).then(() => commentId);

export const getPosts   = (categoryId = '') => fetch(`${BASE_URL}/${categoryId && categoryId + '/'}posts`, { headers: DEFAULT_HEADERS }).then(json => json.json());
export const getPost    = postId => fetch(`${BASE_URL}/posts/${postId}`, { headers: DEFAULT_HEADERS }).then(json => json.json());
export const votePost   = (postId, upOrDown) => fetch(`${BASE_URL}/posts/${postId}`, { headers: DEFAULT_HEADERS, method: 'POST', body: JSON.stringify({option: upOrDown}) }).then(json => json.json());
export const createPost = data => fetch(`${BASE_URL}/posts`, { headers: DEFAULT_HEADERS, method: 'POST', body: JSON.stringify(data) }).then(json => json.json());
export const editPost   = (postId, data) => fetch(`${BASE_URL}/posts/${postId}`, { headers: DEFAULT_HEADERS, method: 'PUT', body: JSON.stringify(data) }).then(json => json.json());
export const deletePost = postId => fetch(`${BASE_URL}/posts/${postId}`, { headers: DEFAULT_HEADERS, method: 'DELETE' }).then(() => postId);
