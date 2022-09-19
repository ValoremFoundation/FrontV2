import { SET_PROFILE } from './types'

export const setProfile = items => ({
  type: SET_PROFILE,
  payload: {
    items,
  },
})