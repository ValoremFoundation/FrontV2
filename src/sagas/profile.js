import { put } from 'redux-saga/effects';

import { SET_PROFILE_SUCCESS, SET_PROFILE_FAILED } from '../actions/types';

export function* setProfile({ payload }) {
  try {
    const { items } = payload;
    yield put({ type: SET_PROFILE_SUCCESS, payload: items });
  } catch (e) {
    yield put({ type: SET_PROFILE_FAILED, e });
  }
}
