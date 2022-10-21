import { put } from 'redux-saga/effects';

import { SET_AUTH_TOKEN_SUCCESS, SET_AUTH_TOKEN_FAILED } from '../actions/types';

export function* setAuthToken({ payload }) {
  try {
    const { items } = payload;
    yield put({ type: SET_AUTH_TOKEN_SUCCESS, payload: items });
  } catch (e) {
    yield put({ type: SET_AUTH_TOKEN_FAILED, e });
  }
}
