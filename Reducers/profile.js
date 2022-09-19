import { SET_PROFILE_SUCCESS, SET_PROFILE_FAILED } from '../actions/types'

export default function profileReducer(state = {}, action) {
  switch (action.type) {
    case SET_PROFILE_SUCCESS: {
      return action.payload
    }
    case SET_PROFILE_FAILED: {
      return action.payload
    }
    default: {
      return state
    }
  }
}
