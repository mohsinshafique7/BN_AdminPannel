import { success, error } from 'redux-saga-requests'
import {
  GET_SUGGESTIONS,
  GET_SUGGESTION, GET_SUGGESTIONS_HISTORY
} from './action'
import { STATE_STATUSES } from '../../utils/app'

const initialState = {
  suggestions: {},
  suggestion: {},
  suggestionsHistory: {
    logs: [],
    count: 0
  },
  status: STATE_STATUSES.INIT
}

export default (state = initialState, action) => {
  switch (action.type) {
    //mappingSuggestions
    case GET_SUGGESTIONS: {
      return processReducer(state)
    }
    case success(GET_SUGGESTIONS): {
      const { suggestions } = action.data

      return {
        ...state, suggestions, status: STATE_STATUSES.READY
      }
    }
    case error(GET_SUGGESTIONS): {
      return errorReducer(state)
    }

    case GET_SUGGESTION: {
      return processReducer(state)
    }
    case success(GET_SUGGESTION): {
      const { suggestion } = action.data

      return {
        ...state, suggestion, status: STATE_STATUSES.READY
      }
    }
    case error(GET_SUGGESTION): {
      return errorReducer(state)
    }

    case GET_SUGGESTIONS_HISTORY: {
      return processReducer(state)
    }
    case success(GET_SUGGESTIONS_HISTORY): {
      const { logs } = action.data

      return {
        ...state,
        suggestionsHistory: logs,
        status: STATE_STATUSES.READY
      }
    }
    case error(GET_SUGGESTIONS_HISTORY): {
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
