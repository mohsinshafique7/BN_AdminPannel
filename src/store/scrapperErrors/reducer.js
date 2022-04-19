import { success, error } from 'redux-saga-requests'
import { GET_SCRAPPER_ERROS,
  GET_SCRAPPER_ERROR,
  DELETE_SCRAPPER_ERROR,
  } from './action'
import { STATE_STATUSES } from '../../utils/app'

const initialState = {
  scrapperErrors: [],
  scrapperError: {},
  status: STATE_STATUSES.INIT
}

export default (state = initialState, action) => {
  switch(action.type) {
    //scrapperErrors
    case GET_SCRAPPER_ERROS: {
      return processReducer(state)
    }
    case success(GET_SCRAPPER_ERROS): {
      return {
        ...state, 
        scrapperErrors: action.data,
        status: STATE_STATUSES.READY
      } 
    }
    case error(GET_SCRAPPER_ERROS): {
      return errorReducer(state)
    }

    case GET_SCRAPPER_ERROR: {
      return processReducer(state)
    }
    case success(GET_SCRAPPER_ERROR): {
      return {
        ...state, 
        scrapperError: action.data,
        status: STATE_STATUSES.READY
      } 
    }
    case error(GET_SCRAPPER_ERROR): {
      return errorReducer(state)
    }

    case DELETE_SCRAPPER_ERROR: {
      return processReducer(state)
    }
    case success(DELETE_SCRAPPER_ERROR): {
      const scrapperErrors = state.scrapperErrors.filter(item => item.id !== action.meta.id)

      return {
        ...state,
        scrapperErrors,
        status: STATE_STATUSES.READY
      }
    }
    case error(DELETE_SCRAPPER_ERROR): {
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
