import { combineReducers } from 'redux';
import navReducer from './nav/nav.reducer';
import authReducer from './auth/auth.reducer';

export default combineReducers({
  nav: navReducer,
  auth: authReducer,
});

