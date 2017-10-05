import { ACTIVATE_MENU } from '../actions/types';
import { ALL_POSTS, CREATE_POST } from '../util/Constants'

const activeMenu = (state = ALL_POSTS, action) => {
  switch (action.type) {
    case ACTIVATE_MENU:
      return action.activeMenu;
    case CREATE_POST:
      return CREATE_POST;
    default:
      return state;
  }
};

export default activeMenu;
