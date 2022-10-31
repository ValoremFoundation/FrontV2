import { all, take, fork, takeEvery } from 'redux-saga/effects';
import { GET_WALLET_ADDRESS, SET_AUTH_TOKEN, SET_PROFILE, GET_CATEGORIES } from '../actions/types';

import { getWalletAddress } from './wallet';
import { setAuthToken } from './auth';
import { setProfile } from './profile';
import { fetchAllCategories } from './categories';

function* rootSaga() {
  yield all([
    takeEvery(GET_WALLET_ADDRESS, getWalletAddress),
    takeEvery(SET_AUTH_TOKEN, setAuthToken),
    takeEvery(SET_PROFILE, setProfile),
    takeEvery(GET_CATEGORIES, fetchAllCategories),
  ]);
}

export default rootSaga;
