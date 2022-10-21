import { combineReducers } from 'redux';
import walletReducer from './wallet';
import profileReducer from './profile';

export default combineReducers({
  wallet: walletReducer,
  profile: profileReducer,
});
