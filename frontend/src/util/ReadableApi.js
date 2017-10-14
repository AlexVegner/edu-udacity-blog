const api = 'http://localhost:3001';

const headers = {
  Accept: 'application/json',
  Authorization: 'auth'
};

export const getCategories = () => get('/categories').then(data => data.categories);

export const getAllPosts = () => get('/posts')

export const getPostsForCategory = category => get(`/${category}/posts`)

export const voteOnPost = (id, vote) => post(`/posts/${id}`, { option: vote })

export const createPost = (body) => post('/posts', body)

export const getPost = (postId) => get(`/posts/${postId}`)

export const editPost = (body) => put(`/posts/${body.id}`, body)

export const deletePost = (postId) => deleteRequest(`/posts/${postId}`)

export const getPostComments = (postId) => get(`/posts/${postId}/comments`)

export const createComment = comment => post('/comments', comment)

export const voteOnComment = (id, vote) => post(`/comments/${id}`, { option: vote })

export const getCommentDetail = id => get(`/comments/${id}`)

export const editComment = (comment) => put(`/comments/${comment.id}`, comment)

export const deleteComment = id => deleteRequest(`/comments/${id}`)

export const get = (path) => {
  return fetch(`${api}${path}`, { headers }).then(res => res.json());
}

export const post = (path, params) => {
  return fetch(`${api}${path}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => res.json());
}

export const put = (path, params) => {
  return fetch(`${api}${path}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => res.json());
}

export const deleteRequest = (path) => {
  return fetch(`${api}${path}`, {
    method: 'DELETE',
    headers,
  }).then(res => res.json());
}

