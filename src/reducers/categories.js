import { GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE } from '../actions/types'

const initialState = {
  items: [],
  error: '',
}

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        items: action.payload,
      }
    }
    case GET_CATEGORIES_FAILURE: {
      return {
        ...state,
        error: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
