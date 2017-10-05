import { combineReducers } from 'redux';
import activeMenu from './menu';
import categories from './categories';
import { posts, postsSorting } from './posts';

export default combineReducers({
  activeMenu,
  categories,
  posts,
  postsSorting
});
