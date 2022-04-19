import { SET_SEARCH_VALUE, SET_SORTED_VALUE, SET_REVERSE_VALUE } from './action'

const initialState = {
    sortedValue: '',
    searchValue: '',
    reverse: false
}

export default (state = initialState, action) => {
    switch(action.type) {
  
      case SET_SEARCH_VALUE: {
        return {
          ...state,
          searchValue: action.value
        }
      }

      case SET_SORTED_VALUE: {
        return {
          ...state,
          sortedValue: action.value
        }
      }

      case SET_REVERSE_VALUE: {
        return {
          ...state,
          reverse: action.value
        }
      }
      
      default:
        return state
    } 
}

