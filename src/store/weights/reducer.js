import { success, error } from 'redux-saga-requests'
import { 
  GET_USER_WEIGHTS, GET_USER_WEIGHT_EXAMPLE, CREATE_USER_WEIGHT, EDIT_USER_WEIGHT,
  GET_COMPANY_WEIGHTS, GET_COMPANY_WEIGHT_EXAMPLE, CREATE_COMPANY_WEIGHT, EDIT_COMPANY_WEIGHT,
} from './action'
import { STATE_STATUSES } from '../../utils/app'

const initialState = {
    dataAllWeights: [],
    weightsExample: {
      portfolioPresentation: [],
      topRanking: [],
      retailers: [],
      totalPds: [],
      perfectProduct: [],
      bestPlacement: [],
      taxonomy: [],
    },
    status: STATE_STATUSES.INIT
}

export default (state = initialState, action) => {
    switch(action.type) {
  
      case GET_USER_WEIGHTS:
      case GET_COMPANY_WEIGHTS: {
        return processReducer(state)
      }
      case success(GET_USER_WEIGHTS):
      case success(GET_COMPANY_WEIGHTS): {
        return {
          ...state,
          dataAllWeights: action.data,
          status: STATE_STATUSES.READY
        }
      }
      case error(GET_USER_WEIGHTS): 
      case error(GET_COMPANY_WEIGHTS): {
        return {
          ...state,
          dataAllWeights: [],
          status: STATE_STATUSES.ERROR
        }
      }

      case GET_USER_WEIGHT_EXAMPLE:
      case GET_COMPANY_WEIGHT_EXAMPLE: {
        return processReducer(state)
      }
      case success(GET_USER_WEIGHT_EXAMPLE):
      case success(GET_COMPANY_WEIGHT_EXAMPLE): {
        return {
          ...state,
          weightsExample: {...state.weightsExample, [action.meta.weight]: action.data },
          status: STATE_STATUSES.READY
        }
      }
      case error(GET_USER_WEIGHT_EXAMPLE): 
      case error(GET_COMPANY_WEIGHT_EXAMPLE): {
        return errorReducer(state)
      }
      
      case CREATE_USER_WEIGHT:
      case CREATE_COMPANY_WEIGHT: {
        return processReducer(state)
      }
      case success(CREATE_USER_WEIGHT):
      case success(CREATE_COMPANY_WEIGHT): {
        const { data } = action
        const { nameParam } = action.meta

        return {
          ...state,
          dataAllWeights: [ ...state.dataAllWeights, data[nameParam] ],
          status: STATE_STATUSES.READY
        }
      }
      case error(CREATE_USER_WEIGHT):
      case error(CREATE_COMPANY_WEIGHT): {
        return errorReducer(state)
      }
      
      case EDIT_USER_WEIGHT:
      case EDIT_COMPANY_WEIGHT: {
        return processReducer(state)
      }
      case success(EDIT_USER_WEIGHT):
      case success(EDIT_COMPANY_WEIGHT): {
        const { data } = action
        const { nameParam } = action.meta

        const clone = [...state.dataAllWeights]
        const objectIndex = clone.findIndex(obj => obj.name === nameParam)
        clone[objectIndex] = data[0]

        return {
          ...state, 
          dataAllWeights: clone,
          status: STATE_STATUSES.READY
        }
      }
      case error(EDIT_USER_WEIGHT):
      case error(EDIT_COMPANY_WEIGHT): {
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
