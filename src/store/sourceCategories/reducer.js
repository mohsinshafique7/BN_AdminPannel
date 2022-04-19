import { success, error } from 'redux-saga-requests'
import { GET_SOURCE_CATEGORIES,
  CREATE_SOURCE_CATEGORY,
  GET_SOURCE_CATEGORY,
  EDIT_SOURCE_CATEGORY ,
  DELETE_SOURCE_CATEGORY,
  SET_SELECT_SOURCE_CATEGORIES,
  GET_SOURCE_CATEGORIES_NAMES } from './action'
import { STATE_STATUSES } from '../../utils/app'

const initialState = {
  selectSourceCategories: [],
  sourceCategories: [],
  sourceCategory: {},
  names: [],
  status: STATE_STATUSES.INIT
}

export default (state = initialState, action) => {
  switch(action.type) {
    //Surce Categories
    case GET_SOURCE_CATEGORIES: {
      return processReducer(state)
    }
    case success(GET_SOURCE_CATEGORIES): {
      const { sourceCategories } = action.data

      return {
        ...state, sourceCategories, status: STATE_STATUSES.READY
      } 
    }
    case error(GET_SOURCE_CATEGORIES): {
      return errorReducer(state)
    }

    case GET_SOURCE_CATEGORY: {
      return processReducer(state)
    }
    case success(GET_SOURCE_CATEGORY): {
      const { sourceCategory } = action.data

      return {
        ...state, sourceCategory, status: STATE_STATUSES.READY
      } 
    }
    case error(GET_SOURCE_CATEGORY): {
      return errorReducer(state)
    }

    case CREATE_SOURCE_CATEGORY: {
      return processReducer(state)
    }
    case success(CREATE_SOURCE_CATEGORY): {
      return {
        ...state, 
        sourceCategories: [...state.sourceCategories, action.data.sourceCategory], 
        status: STATE_STATUSES.READY
      } 
    }
    case error(CREATE_SOURCE_CATEGORY): {
      return errorReducer(state)
    }

    case EDIT_SOURCE_CATEGORY: {
      return processReducer(state)
    }
    case success(EDIT_SOURCE_CATEGORY): {
      const { sourceCategory } = action.data

      return {
        ...state, 
        sourceCategory,
        status: STATE_STATUSES.READY
      } 
    }
    case error(EDIT_SOURCE_CATEGORY): {
      return errorReducer(state)
    }

    case DELETE_SOURCE_CATEGORY: {
      return processReducer(state)
    }
    case success(DELETE_SOURCE_CATEGORY): {
      const sourceCategories = state.sourceCategories.filter(item => item.id !== action.meta.id)

      return {
        ...state,
        sourceCategories,
        status: STATE_STATUSES.READY
      }
    }
    case error(DELETE_SOURCE_CATEGORY): {
      return errorReducer(state)
    }

    case GET_SOURCE_CATEGORIES_NAMES: {
      return processReducer(state)
    }
    case success(GET_SOURCE_CATEGORIES_NAMES): {
      const { names } = action.data

      return {
        ...state, names, status: STATE_STATUSES.READY
      } 
    }
    case error(GET_SOURCE_CATEGORIES_NAMES): {
      return errorReducer(state)
    }

    case SET_SELECT_SOURCE_CATEGORIES: {
        const ids = action.data.ids
        const selectSourceCategories = state.sourceCategories.filter((c) => !ids.includes(c.id))

        return {
            ...state,
            selectSourceCategories,
            status: STATE_STATUSES.READY
          }
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
