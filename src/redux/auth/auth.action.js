import { auth, db } from '../../config/firebase';
import authActions from './auth.actionTypes';
import * as storage from '../../helpers/token';

export const signup = obj => async (dispatch) => {
  dispatch({ type: authActions.SIGNUP_LOADING });
  let data;
  let docRef;
  const user = {};
  try {
    data = await auth.createUserWithEmailAndPassword(obj.email, obj.password);
    docRef = await db.collection('users').add({
      email: obj.email,
      uid: data.user.uid,
      name: obj.username,
      country: obj.country,
      category: 'researcher',
      verified: false,
    });
    user.name = obj.username;
    user.email = obj.email;
    user.uid = data.user.uid;
    user.did = docRef.id;
    storage.saveToken(user);
    dispatch({ type: authActions.SIGNUP_SUCCESS, data: user });
  } catch (err) {
    dispatch({ type: authActions.SIGNUP_FAILED, error: err.message });
  }
};

export const login = obj => async (dispatch) => {
  dispatch({ type: authActions.LOGIN_LOADING });
  let data;
  let user;
  let query;
  try {
    data = await auth.signInWithEmailAndPassword(obj.email, obj.password);
    query = await db.collection('users').where('uid', '==', data.user.uid).get();
    query.forEach((doc) => {
      user = storage.saveToken(doc.data());
    });
    dispatch({ type: authActions.LOGIN_SUCCESS, data: user });
  } catch (err) {
    dispatch({ type: authActions.LOGIN_FAILED, error: err.message });
  }
};


export const checkAuth = () => (dispatch) => {
  dispatch({ type: authActions.CHECK_AUTH_LOADING });
  auth.onAuthStateChanged((user) => {
    if (user) {
      const localUser = storage.getToken() || user;
      dispatch({ type: authActions.CHECK_AUTH_SUCCESS, data: localUser });
    } else {
      dispatch({ type: authActions.CHECK_AUTH_FAILED, error: "user doesn't exist" });
    }
  }, (err) => {
    dispatch({ type: authActions.CHECK_AUTH_FAILED, error: err.message });
  });
};

export const sendResetPassword = email => (dispatch) => {
  dispatch({ type: authActions.SEND_RESET_PASSWORD_LOADING });
  auth.sendPasswordResetEmail(email).then((user) => {
    dispatch({ type: authActions.SEND_RESET_PASSWORD_SUCCESS, data: user });
  }).catch(err => dispatch({ type: authActions.SEND_RESET_PASSWORD_FAILED, error: err.message }));
};


export const resetPassword = obj => (dispatch) => {
  dispatch({ type: authActions.RESET_PASSWORD_LOADING });
  auth.confirmPasswordReset(obj.code, obj.password).then((user) => {
    dispatch({ type: authActions.RESET_PASSWORD_SUCCESS, data: user });
  }).catch(err => dispatch({ type: authActions.RESET_PASSWORD_FAILED, error: err.message }));
};

export const logout = () => async (dispatch) => {
  dispatch({ type: authActions.LOGOUT_LOADING });
  try {
    await auth.signOut();
    storage.clearToken();
    dispatch({ type: authActions.LOGOUT_SUCCESS });
  } catch (err) {
    dispatch({ type: authActions.LOGOUT_FAILED, error: err.message });
  }
};

export default {
  login, signup, resetPassword, sendResetPassword, checkAuth,
};
