import * as ReadableApi from '../util/ReadableApi';
import { GET_POSTS, SORT_POSTS_BY, VOTE_ON_POST } from './types';
import { push } from 'react-router-redux';

export const getPosts = posts => ({
  type: GET_POSTS,
  posts
});

export const fetchAllPosts = () => async dispatch => {
  const posts = await ReadableApi.getAllPosts();
  return dispatch(getPosts(posts));
};

export const fetchPostsByCategory = category => async dispatch => {
  const posts = await ReadableApi.getPosts(category);
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

export const createPost = (post) => async dispatch => {
  //await ReadableApi.createPost(post);
  push('/');
};
