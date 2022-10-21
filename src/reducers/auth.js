import { SET_AUTH_TOKEN_SUCCESS, SET_AUTH_TOKEN_FAILED } from '../actions/types';

const initialState = {
  token: '',
  error: '',
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_TOKEN_SUCCESS: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case SET_AUTH_TOKEN_FAILED: {
      return {
        ...state,
        token: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
