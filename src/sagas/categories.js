import { call, put } from 'redux-saga/effects';
import { getCategories } from '../api';

import { GET_CATEGORIES_FAILURE, GET_CATEGORIES_SUCCESS } from '../actions/types';

export function* fetchAllCategories() {
  try {
    const {
      data: { data },
    } = yield call(getCategories);
    yield put({ type: GET_CATEGORIES_SUCCESS, payload: { items: data } });
  } catch (e) {
    yield put({ type: GET_CATEGORIES_FAILURE, e });
  }
}
