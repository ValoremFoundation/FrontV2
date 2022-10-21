import { put } from 'redux-saga/effects';

import { GET_WALLET_ADDRESS_SUCCESS, GET_WALLET_ADDRESS_FAILURE } from '../actions/types';

export function* getWalletAddress({ payload }) {
  try {
    const { items } = payload;
    yield put({ type: GET_WALLET_ADDRESS_SUCCESS, payload: items });
  } catch (e) {
    yield put({ type: GET_WALLET_ADDRESS_FAILURE, e });
  }
}
