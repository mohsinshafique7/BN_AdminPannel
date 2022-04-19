import { success, error } from 'redux-saga-requests'
import { GET_USERS,
  GET_USER,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  GET_USER_HISTORY } from './action'
import { STATE_STATUSES } from '../../utils/app'

const initialState = {
    users: [],
    user: {},
    userHistory: [],
    status: STATE_STATUSES.INIT
}

export default (state = initialState, action) => {
    switch(action.type) {
  
      case GET_USERS: {
        return processReducer(state)
      }
      case success(GET_USERS): {
        return {
            ...state, 
            users: action.data.users,
            status: STATE_STATUSES.READY
        } 
      }
      case error(GET_USERS): {
        return errorReducer(state)
      }

      case GET_USER: {
        return processReducer(state)
      }
      case success(GET_USER): {
        return {
          ...state, 
          user: action.data.user, 
          status: STATE_STATUSES.READY
        } 
      }
      case error(GET_USER): {
        return errorReducer(state)
      }

      case CREATE_USER: {
        return processReducer(state)
      }
      case success(CREATE_USER): {
        return {
          ...state, 
          users: [...state.users, action.data], 
          status: STATE_STATUSES.READY
        } 
      }
      case error(CREATE_USER): {
        return errorReducer(state)
      }

      case EDIT_USER: {
        return processReducer(state)
      }
      case success(EDIT_USER): {
        const { user } = action.data
  
        return {
          ...state, 
          user,
          status: STATE_STATUSES.READY
        } 
      }
      case error(EDIT_USER): {
        return errorReducer(state)
      }

      case DELETE_USER: {
        return processReducer(state)
      }
      case success(DELETE_USER): {
        const users = state.users.filter(item => item.id !== action.meta.id)
  
        return {
          ...state,
          users,
          status: STATE_STATUSES.READY
        }
      }
      case error(DELETE_USER): {
        return errorReducer(state)
      }

      case GET_USER_HISTORY: {
        return processReducer(state)
      }
      case success(GET_USER_HISTORY): {
        return {
            ...state, 
            userHistory: action.data.history,
            status: STATE_STATUSES.READY
        } 
      }
      case error(GET_USER_HISTORY): {
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
