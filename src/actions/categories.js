import { GET_CATEGORIES } from './types'

export const fetchAllCategories = items => ({
  type: GET_CATEGORIES,
  payload: {
    items,
  },
})
