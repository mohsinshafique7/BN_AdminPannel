import { success, error } from 'redux-saga-requests'
import {
  GET_USER_SOURCE_CATEGORIES,
  DELETE_USER_SOURCE_CATEGORY,
  // CREATE_USER_SOURCE_CATEGORY 
} from './action'
import { STATE_STATUSES } from '../../utils/app'

const initialState = {
  userSourceCategories: [],
  status: STATE_STATUSES.INIT
}

export default (state = initialState, action) => {
  switch (action.type) {
    //Surce Categories
    case GET_USER_SOURCE_CATEGORIES: {
      return processReducer(state)
    }
    case success(GET_USER_SOURCE_CATEGORIES): {
      const { sourceCategory } = action.data.userSourceCategories

      return {
        ...state,
        userSourceCategories: sourceCategory,
        status: STATE_STATUSES.READY
      }
    }
    case error(GET_USER_SOURCE_CATEGORIES): {
      return errorReducer(state)
    }



    // case CREATE_USER_SOURCE_CATEGORY: {
    //   return processReducer(state)
    // }
    // case success(CREATE_USER_SOURCE_CATEGORY): {
    //   return {
    //     ...state, 
    //     userSourceCategories: [...state.userSourceCategories, action.data.sourceCategory], 
    //     status: STATE_STATUSES.READY
    //   } 
    // }
    // case error(CREATE_USER_SOURCE_CATEGORY): {
    //   return errorReducer(state)
    // }



    // case EDIT_USER_SOURCE_CATEGORY: {
    //   return processReducer(state)
    // }
    // case success(EDIT_USER_SOURCE_CATEGORY): {
    //   const { userSourceCategories } = action.data

    //   return {
    //     ...state, 
    //     userSourceCategories,
    //     status: STATE_STATUSES.READY
    //   } 
    // }
    // case error(EDIT_USER_SOURCE_CATEGORY): {
    //   return errorReducer(state)
    // }

    case DELETE_USER_SOURCE_CATEGORY: {
      return processReducer(state)
    }
    case success(DELETE_USER_SOURCE_CATEGORY): {
      const userSourceCategories = state.userSourceCategories.filter(item => item.id !== action.meta.id)

      return {
        ...state,
        userSourceCategories,
        status: STATE_STATUSES.READY
      }
    }
    case error(DELETE_USER_SOURCE_CATEGORY): {
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
