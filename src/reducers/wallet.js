import { GET_WALLET_ADDRESS_SUCCESS, GET_WALLET_ADDRESS_FAILURE } from '../actions/types';

const initialState = {
  address: '',
  error: '',
};

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WALLET_ADDRESS_SUCCESS: {
      return {
        ...state,
        address: action.payload,
      };
    }
    case GET_WALLET_ADDRESS_FAILURE: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
