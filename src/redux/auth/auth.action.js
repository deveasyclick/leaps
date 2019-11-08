import { auth, db } from '../../config/firebase';
import authActions from './auth.actionTypes';
import * as storage from '../../helpers/token';

export const signup = obj => async (dispatch) => {
  dispatch({ type: authActions.SIGNUP_LOADING });
  let data;
  const user = {};
  try {
    data = await auth.createUserWithEmailAndPassword(obj.email, obj.password);
    await db
      .collection('web_users')
      .doc(data.user.uid)
      .set({
        email: obj.email,
        uid: data.user.uid,
        name: obj.name,
        country: obj.country,
        category: 'researcher',
        verified: false,
        isAdmin: false,
        uploads: 0,
        approved: 0,
        pending: 0,
      });
    user.name = obj.name;
    user.email = obj.email;
    user.uid = data.user.uid;
    user.category = 'researcher';
    user.verified = false;
    user.country = obj.country;
    user.isAdmin = false;
    user.file_uploads = 0;
    user.file_pending = 0;
    user.file_approved = 0;
    user.approved = false;
    storage.set('user', user);
    dispatch({ type: authActions.SIGNUP_SUCCESS, data: user });
  } catch (err) {
    dispatch({ type: authActions.SIGNUP_FAILED, error: err.message });
  }
};

export const login = obj => async (dispatch) => {
  dispatch({ type: authActions.LOGIN_LOADING });
  let data;
  let query;
  try {
    query = await db
      .collection('web_users')
      .where('email', '==', obj.email)
      .get();
    if (query.size < 1) {
      return dispatch({
        type: authActions.LOGIN_FAILED,
        error: 'User does not exists',
      });
    }
    data = await auth.signInWithEmailAndPassword(obj.email, obj.password);
    query = await db
      .collection('web_users')
      .where('uid', '==', data.user.uid)
      .get();
    query.forEach((doc) => {
      const user = doc.data();
      storage.set('user', user);
      dispatch({ type: authActions.LOGIN_SUCCESS, data: user });
    });
  } catch (err) {
    dispatch({ type: authActions.LOGIN_FAILED, error: err.message });
  }
};

export const checkAuth = () => (dispatch) => {
  dispatch({ type: authActions.CHECK_AUTH_LOADING });
  auth.onAuthStateChanged(
    (user) => {
      if (user) {
        const localUser = storage.get('user') || user;
        dispatch({ type: authActions.CHECK_AUTH_SUCCESS, data: localUser });
      } else {
        dispatch({
          type: authActions.CHECK_AUTH_FAILED,
          error: "user doesn't exist",
        });
      }
    },
    (err) => {
      dispatch({ type: authActions.CHECK_AUTH_FAILED, error: err.message });
    },
  );
};

export const sendResetPassword = obj => (dispatch) => {
  dispatch({ type: authActions.SEND_RESET_PASSWORD_LOADING });
  auth
    .sendPasswordResetEmail(obj.email)
    .then((user) => {
      dispatch({ type: authActions.SEND_RESET_PASSWORD_SUCCESS, data: user });
    })
    .catch(err => dispatch({
        type: authActions.SEND_RESET_PASSWORD_FAILED,
        error: err.message,
      }),);
};

export const resetPassword = obj => (dispatch) => {
  dispatch({ type: authActions.RESET_PASSWORD_LOADING });
  auth
    .confirmPasswordReset(obj.code, obj.password)
    .then((user) => {
      dispatch({ type: authActions.RESET_PASSWORD_SUCCESS, data: user });
    })
    .catch(err => dispatch({ type: authActions.RESET_PASSWORD_FAILED, error: err.message }),);
};

export const logout = () => async (dispatch) => {
  dispatch({ type: authActions.LOGOUT_LOADING });
  try {
    await auth.signOut();
    storage.clear();
    dispatch({ type: authActions.LOGOUT_SUCCESS });
  } catch (err) {
    dispatch({ type: authActions.LOGOUT_FAILED, error: err.message });
  }
};

export default {
  login,
  signup,
  resetPassword,
  sendResetPassword,
  checkAuth,
};
