import { success, error } from 'redux-saga-requests'
import { GET_ERRORS,
  GET_ERROR,
  DELETE_ERROR,
  DELETE_ERRORS } from './action'
import { STATE_STATUSES } from '../../utils/app'

const initialState = {
  errors: [],
  error: {},
  status: STATE_STATUSES.INIT
}

export default (state = initialState, action) => {
  switch(action.type) {
    //errors
    case GET_ERRORS: {
      return processReducer(state)
    }
    case success(GET_ERRORS): {
      return {
        ...state, 
        errors: action.data,
        status: STATE_STATUSES.READY
      } 
    }
    case error(GET_ERRORS): {
      return errorReducer(state)
    }

    case GET_ERROR: {
      return processReducer(state)
    }
    case success(GET_ERROR): {
      return {
        ...state, 
        error: action.data,
       status: STATE_STATUSES.READY
      } 
    }
    case error(GET_ERROR): {
      return errorReducer(state)
    }

    case DELETE_ERROR: {
      return processReducer(state)
    }
    case success(DELETE_ERROR): {
      const errors = state.errors.filter(item => item.id !== action.meta.id)

      return {
        ...state,
        errors,
        status: STATE_STATUSES.READY
      }
    }
    case error(DELETE_ERROR): {
      return errorReducer(state)
    }

    case DELETE_ERRORS: {
      return processReducer(state)
    }
    case success(DELETE_ERRORS): {
      return {
        ...state, 
        errors: action.data,
        status: STATE_STATUSES.READY
      } 
    }
    case error(DELETE_ERRORS): {
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
