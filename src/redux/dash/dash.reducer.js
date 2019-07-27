import dashActionTypes from './dash.actionTypes';

const initialState = {
  type: '',
  data: null,
  error: '',
};
export default (state = initialState, payload) => {
  switch (payload.type) {
    case dashActionTypes.UPLOAD_RESOURCES_LOADING:
      return {
        ...state,
        type: dashActionTypes.UPLOAD_RESOURCES_LOADING,
      };

    case dashActionTypes.UPLOAD_RESOURCES_SUCCESS:
      return {
        ...state,
        type: dashActionTypes.UPLOAD_RESOURCES_SUCCESS,
        data: payload.data,
      };
    case dashActionTypes.UPLOAD_RESOURCES_FAILED:
      return {
        ...state,
        type: dashActionTypes.UPLOAD_RESOURCES_FAILED,
        error: payload.error,
      };


    default: return state;
  }
};
