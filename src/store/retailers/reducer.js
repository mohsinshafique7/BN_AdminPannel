import { success, error } from 'redux-saga-requests'
import { GET_RETAILERS,
  GET_RETAILER,
  CREATE_RETAILER,
  DELETE_RETAILER } from './action'
import { STATE_STATUSES } from '../../utils/app'

const initialState = {
  retailers: [],
  retailer: {},
  status: STATE_STATUSES.INIT
}

export default (state = initialState, action) => {
  switch(action.type) {
    //retailers
    case GET_RETAILERS: {
      return processReducer(state)
    }
    case success(GET_RETAILERS): {
      const { retailers } = action.data

      return {
        ...state, retailers, status: STATE_STATUSES.READY
      } 
    }
    case error(GET_RETAILERS): {
      return errorReducer(state)
    }

    case GET_RETAILER: {
      return processReducer(state)
    }
    case success(GET_RETAILER): {
      const { retailer } = action.data

      return {
        ...state, retailer, status: STATE_STATUSES.READY
      } 
    }
    case error(GET_RETAILER): {
      return errorReducer(state)
    }

    case CREATE_RETAILER: {
      return processReducer(state)
    }
    case success(CREATE_RETAILER): {
      const { retailer } = action.data

      return {
        ...state, 
        retailers: [...state.retailers, retailer], 
        status: STATE_STATUSES.READY
      } 
    }
    case error(CREATE_RETAILER): {
      return errorReducer(state)
    }

    case DELETE_RETAILER: {
      return processReducer(state)
    }
    case success(DELETE_RETAILER): {
      const retailers = state.retailers.filter(item => item.id !== action.meta.id)

      return {
        ...state,
        retailers,
        status: STATE_STATUSES.READY
      }
    }
    case error(DELETE_RETAILER): {
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
