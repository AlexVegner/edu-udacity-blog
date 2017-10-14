import * as ReadableApi from '../util/ReadableApi';
import { GET_POSTS, SORT_POSTS_BY, VOTE_ON_POST } from './types';

export const getPosts = posts => ({
  type: GET_POSTS,
  posts
});

export const fetchAllPosts = () => async dispatch => {
  const posts = await ReadableApi.getAllPosts();
  return dispatch(getPosts(posts));
};

export const fetchPostsByCategory = category => async dispatch => {
  const posts = await ReadableApi.getPostsForCategory(category);
  return dispatch(getPosts(posts));
};

export const sortPostsBy = sorting => ({
  type: SORT_POSTS_BY,
  sorting
});

export const voteFor = post => ({
  type: VOTE_ON_POST,
  post
});

export const voteOnPost = (id, vote) => async dispatch => {
  const post = await ReadableApi.voteOnPost(id, vote);
  return dispatch(voteFor(post));
};

export const editPost = (post, history) => async dispatch => {
  await ReadableApi.editPost(post);
  history.push('/');
};

export const createPost = (post, history) => async dispatch => {
  await ReadableApi.createPost(post);
  history.push('/');
};

export const deletePost = (postId) => async dispatch => {
  await ReadableApi.deletePost(postId);
  dispatch(fetchAllPosts());
};

// export const voteOnComment = (id, vote) => async dispatch => {
//   const post = await ReadableApi.voteOnPost(id, vote);
//   return dispatch(voteFor(post));
// };
//
// export const editComment = (post, history) => async dispatch => {
//   await ReadableApi.editPost(post);
//   history.push('/');
// };
//
// export const createComment = (post, history) => async dispatch => {
//   await ReadableApi.createPost(post);
//   history.push('/');
// };
//
// export const deleteComment = (postId) => async dispatch => {
//   await ReadableApi.deletePost(postId);
//   dispatch(fetchAllPosts());
// };


