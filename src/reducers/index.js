import { combineReducers } from 'redux';
import walletReducer from './wallet';
import profileReducer from './profile';
import authReducer from './auth';
import categoriesReducer from './categories';

export default combineReducers({
  wallet: walletReducer,
  profile: profileReducer,
  auth: authReducer,
  categories: categoriesReducer,
});
