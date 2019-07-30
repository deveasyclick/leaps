import dashActionTypes from './dash.actionTypes';

const initialState = {
  type: '',
  data: null,
  error: ''
};
export default (state = initialState, payload) => {
  switch (payload.type) {
    case dashActionTypes.UPLOAD_RESOURCES_LOADING:
      return {
        ...state,
        type: dashActionTypes.UPLOAD_RESOURCES_LOADING
      };

    case dashActionTypes.UPLOAD_RESOURCES_SUCCESS:
      return {
        ...state,
        type: dashActionTypes.UPLOAD_RESOURCES_SUCCESS,
        data: payload.data
      };
    case dashActionTypes.UPLOAD_RESOURCES_FAILED:
      return {
        ...state,
        type: dashActionTypes.UPLOAD_RESOURCES_FAILED,
        error: payload.error
      };

    case dashActionTypes.UPDATE_DETAILS_LOADING:
      return {
        ...state,
        type: dashActionTypes.UPDATE_DETAILS_LOADING
      };
    case dashActionTypes.UPDATE_DETAILS_SUCCESS:
      return {
        ...state,
        type: dashActionTypes.UPDATE_DETAILS_SUCCESS,
        data: payload.data
      };

    case dashActionTypes.UPDATE_DETAILS_FAILED:
      return {
        ...state,
        type: dashActionTypes.UPDATE_DETAILS_FAILED,
        error: payload.error
      };

    default:
      return state;
  }
};
