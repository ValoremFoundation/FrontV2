import { SET_AUTH_TOKEN } from './types';

export const setAuthToken = items => ({
  type: SET_AUTH_TOKEN,
  payload: {
    items,
  },
});
