import * as ReadableApi from '../util/ReadableApi';
import { LOAD_CATEGORIES } from './types';

export const loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories: categories
});

export const fetchCategories = () => async dispatch => {
  const categories = await ReadableApi.getCategories();
  return dispatch(loadCategories(categories));
};
