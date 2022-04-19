import { success, error } from 'redux-saga-requests'
import { GET_NOTIFICATIONS, GET_NOTIFICATION, DELETE_NOTIFICATIONS, DELETE__NOTIFICATION } from './action'
import { STATE_STATUSES } from '../../utils/app'

const initialState = {
  notifications: [],
  notification: {},
  status: STATE_STATUSES.INIT
}

export default (state = initialState, action) => {
  switch(action.type) {
    //notifications
    case GET_NOTIFICATIONS: {
      return processReducer(state)
    }
    case success(GET_NOTIFICATIONS): {
      return {
        ...state, 
        notifications: action.data,
        status: STATE_STATUSES.READY
      } 
    }
    case error(GET_NOTIFICATIONS): {
      return errorReducer(state)
    }

    case GET_NOTIFICATION: {
      return processReducer(state)
    }
    case success(GET_NOTIFICATION): {
      return {
        ...state, 
        notification: action.data,
        status: STATE_STATUSES.READY
      } 
    }
    case error(GET_NOTIFICATION): {
      return errorReducer(state)
    }

    case DELETE__NOTIFICATION: {
      return processReducer(state)
    }
    case success(DELETE__NOTIFICATION): {
      const notifications = state.notifications.filter(item => item.id !== action.meta.id)

      return {
        ...state,
        notifications,
        status: STATE_STATUSES.READY
      }
    }
    case error(DELETE__NOTIFICATION): {
      return errorReducer(state)
    }

    case DELETE_NOTIFICATIONS: {
      return processReducer(state)
    }
    case success(DELETE_NOTIFICATIONS): {
      return {
        ...state, 
        notifications: action.data,
        status: STATE_STATUSES.READY
      } 
    }
    case error(DELETE_NOTIFICATIONS): {
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
