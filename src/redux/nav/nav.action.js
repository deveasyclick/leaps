import navActionTypes from './nav.action-type';

export const toggleNav = obj => ({
  type: navActionTypes.TOGGLE_NAV,
  show: obj.show,
});
