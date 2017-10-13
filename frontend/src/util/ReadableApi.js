const api = 'http://localhost:3001';

const headers = {
  Accept: 'application/json',
  Authorization: 'auth'
};

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers }).then(res => res.json());

export const getPosts = category => {
  return fetch(`${api}/${category}/posts`, { headers }).then(res => res.json());
};

export const voteOnPost = (id, vote) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  }).then(res => res.json());

export const createPost = (post) => {
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json());
}

export const getPost = (postId) => {
  return fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json());
}


export const editPost = (post) => {
  return fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json());
}

export const deletePost = (postId) => {
  return fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
  }).then(res => res.json());
}