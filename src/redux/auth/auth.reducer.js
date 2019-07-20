import authActionTypes from './auth.actionTypes';

const initialState = {
  isAuthenticated: false,
  type: '',
  data: null,
  error: '',
};
export default (state = initialState, payload) => {
  switch (payload.type) {
    case authActionTypes.SIGNUP_LOADING:
      return {
        ...state,
        type: authActionTypes.SIGNUP_LOADING,
      };

    case authActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        type: authActionTypes.SIGNUP_SUCCESS,
        isAuthenticated: true,
        data: { ...state.data, ...payload.data },
      };
    case authActionTypes.SIGNUP_FAILED:
      return {
        ...state,
        type: authActionTypes.SIGNUP_FAILED,
        error: payload.error,
        isAuthenticated: false,
      };

    case authActionTypes.LOGIN_LOADING:
      return {
        ...state,
        type: authActionTypes.LOGIN_LOADING,
      };

    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        type: authActionTypes.LOGIN_SUCCESS,
        isAuthenticated: true,
        data: { ...state.data, ...payload.data },
      };
    case authActionTypes.LOGIN_FAILED:
      return {
        ...state,
        type: authActionTypes.LOGIN_FAILED,
        error: payload.error,
        isAuthenticated: false,
      };


    case authActionTypes.LOGOUT_LOADING:
      return {
        ...state,
        type: authActionTypes.LOGOUT_LOADING,
      };

    case authActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        type: authActionTypes.LOGOUT_SUCCESS,
        isAuthenticated: true,
        data: { ...state.data, ...payload.data },
      };
    case authActionTypes.LOGOUT_FAILED:
      return {
        ...state,
        type: authActionTypes.LOGOUT_FAILED,
        error: payload.error,
        isAuthenticated: false,
      };

    case authActionTypes.CHECK_AUTH_LOADING:
      return {
        ...state,
        type: authActionTypes.CHECK_AUTH_LOADING,
      };

    case authActionTypes.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        type: authActionTypes.CHECK_AUTH_SUCCESS,
        isAuthenticated: true,
        data: { ...state.data, ...payload.data },
      };
    case authActionTypes.CHECK_AUTH_FAILED:
      return {
        ...state,
        type: authActionTypes.CHECK_AUTH_FAILED,
        error: payload.error,
        isAuthenticated: false,
      };
    case authActionTypes.RESET_PASSWORD_LOADING:
      return {
        ...state,
        type: authActionTypes.RESET_PASSWORD_LOADING,
      };
    case authActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        type: authActionTypes.RESET_PASSWORD_SUCCESS,
        isAuthenticated: true,
        data: { ...state.data, ...payload.data },
      };
    case authActionTypes.RESET_PASSWORD_FAILED:
      return {
        ...state,
        type: authActionTypes.RESET_PASSWORD_FAILED,
        isAuthenticated: false,
        error: payload.error,
      };


    case authActionTypes.SEND_RESET_PASSWORD_LOADING:
      return {
        ...state,
        type: authActionTypes.SEND_RESET_PASSWORD_LOADING,
      };
    case authActionTypes.SEND_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        type: authActionTypes.SEND_RESET_PASSWORD_SUCCESS,
        isAuthenticated: false,
        data: { ...state.data, ...payload.data },
      };
    case authActionTypes.SEND_RESET_PASSWORD_FAILED:
      return {
        ...state,
        type: authActionTypes.SEND_RESET_PASSWORD_FAILED,
        isAuthenticated: false,
        error: payload.error,
      };
    default: return state;
  }
};
