import { auth, db } from '../../config/firebase';
import authActions from './auth.actionTypes';


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
    dispatch({ type: authActions.SIGNUP_SUCCESS, data: user });
  } catch (err) {
    dispatch({ type: authActions.SIGNUP_FAILED, error: err.message });
  }
};

export const login = obj => (dispatch) => {
  dispatch({ type: authActions.LOGIN_LOADING });
  auth.signInWithEmailAndPassword(obj.email, obj.password).then((user) => {
    dispatch({ type: authActions.LOGIN_SUCCESS, data: user });
  }).catch(err => dispatch({ type: authActions.LOGIN_FAILED, error: err.message }));
};


export const checkAuth = () => (dispatch) => {
  dispatch({ type: authActions.CHECK_AUTH_LOADING });
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch({ type: authActions.CHECK_AUTH_SUCCESS });
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


export default {
  login, signup, resetPassword, sendResetPassword, checkAuth,
};
