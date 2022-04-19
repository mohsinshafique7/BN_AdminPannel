import { success, error } from 'redux-saga-requests'
import { GET_PRODUCT_ERRORS, GET_PRODUCT_ERROR, DELETE_PRODUCT_ERROR } from './action'
import { STATE_STATUSES } from '../../utils/app'

const initialState = {
  productErrors: [],
  productError: {},
  status: STATE_STATUSES.INIT
}

export default (state = initialState, action) => {
  switch(action.type) {
    //productErrors
    case GET_PRODUCT_ERRORS: {
      return processReducer(state)
    }
    case success(GET_PRODUCT_ERRORS): {
      return {
        ...state, 
        productErrors: action.data,
        status: STATE_STATUSES.READY
      } 
    }
    case error(GET_PRODUCT_ERRORS): {
      return errorReducer(state)
    }

    case GET_PRODUCT_ERROR: {
      return processReducer(state)
    }
    case success(GET_PRODUCT_ERROR): {
      return {
        ...state, 
        productError: action.data,
        status: STATE_STATUSES.READY
      } 
    }
    case error(GET_PRODUCT_ERROR): {
      return errorReducer(state)
    }

    case DELETE_PRODUCT_ERROR: {
      return processReducer(state)
    }
    case success(DELETE_PRODUCT_ERROR): {
      const productErrors = state.productErrors.filter(item => item.id !== action.meta.id)

      return {
        ...state,
        productErrors,
        status: STATE_STATUSES.READY
      }
    }
    case error(DELETE_PRODUCT_ERROR): {
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
