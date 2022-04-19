import { success, error } from 'redux-saga-requests'
import { GET_CATEGORIES,
  GET_CATEGORY,
  CREATE_CATEGORY,
  EDIT_CATEGORY } from './action'
import { STATE_STATUSES } from '../../utils/app'

const initialState = {
  categories: [],
  category: {},
  status: STATE_STATUSES.INIT
}

export default (state = initialState, action) => {
  switch(action.type) {
    //categories
    case GET_CATEGORIES: {
      return processReducer(state)
    }
    case success(GET_CATEGORIES): {
      const { categories } = action.data

      return {
        ...state, categories, status: STATE_STATUSES.READY
      } 
    }
    case error(GET_CATEGORIES): {
      return errorReducer(state)
    }

    case GET_CATEGORY: {
      return processReducer(state)
    }
    case success(GET_CATEGORY): {
      const { category } = action.data

      return {
        ...state, category, status: STATE_STATUSES.READY
      } 
    }
    case error(GET_CATEGORY): {
      return errorReducer(state)
    }

    case CREATE_CATEGORY: {
      return processReducer(state)
    }
    case success(CREATE_CATEGORY): {
      const { category } = action.data

      return {
        ...state, 
        categories: [...state.categories, category], 
        status: STATE_STATUSES.READY
      } 
    }
    case error(CREATE_CATEGORY): {
      return errorReducer(state)
    }

    case EDIT_CATEGORY: {
      return processReducer(state)
    }
    case success(EDIT_CATEGORY): {
      const { category } = action.data

      return {
        ...state, category, status: STATE_STATUSES.READY
      } 
    }
    case error(EDIT_CATEGORY): {
      return errorReducer(state)
    }


    default:
      return state
  } 
}

const errorReducer = (state) => ({
  ...state,
  status: STATE_STATUSES.ERROR
})

const processReducer = (state) => ({
  ...state,
  status: STATE_STATUSES.PENDING
})
