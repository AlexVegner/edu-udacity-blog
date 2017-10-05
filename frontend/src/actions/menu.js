import { ACTIVATE_MENU } from './types';

export const activateMenu = menu => ({
  type: ACTIVATE_MENU,
  activeMenu: menu
});
