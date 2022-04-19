import { success, error } from 'redux-saga-requests'
import { GET_MANUFACTURERS, 
  GET_MANUFACTURER, 
  CREATE_MANUFACTURER,
  EDIT_MANUFACTURER,
  DELETE_MANUFACTURER,
  GET_BRANDS, 
  GET_BRAND, 
  CREATE_BRAND_MANUFACTURERS,
  CREATE_BRAND_BRANDS,
  EDIT_BRAND,
  MANUFACTURER_DELETE_BRAND,
  DELETE_BRAND } from './action'
import { STATE_STATUSES } from '../../utils/app'

const initialState = {
  manufacturers: [],
  manufacturer: {},
  brands: [],
  brand: {},
  status: STATE_STATUSES.INIT
}

export default (state = initialState, action) => {
  switch(action.type) {
    //manufacturers
    case GET_MANUFACTURERS: {
      return processReducer(state)
    }
    case success(GET_MANUFACTURERS): {
      const { manufacturers } = action.data

      return {
        ...state, manufacturers, status: STATE_STATUSES.READY
      } 
    }
    case error(GET_MANUFACTURERS): {
      return errorReducer(state)
    }

    case GET_MANUFACTURER: {
      return processReducer(state)
    }
    case success(GET_MANUFACTURER): {
      const { manufacturer } = action.data

      return {
        ...state, manufacturer, status: STATE_STATUSES.READY
      } 
    }
    case error(GET_MANUFACTURER): {
      return errorReducer(state)
    }

    case CREATE_MANUFACTURER: {
      return processReducer(state)
    }
    case success(CREATE_MANUFACTURER): {
      const { manufacturer } = action.data

      return {
        ...state, 
        manufacturers: [...state.manufacturers, manufacturer], 
        status: STATE_STATUSES.READY
      } 
    }
    case error(CREATE_MANUFACTURER): {
      return errorReducer(state)
    }

    case EDIT_MANUFACTURER: {
      return processReducer(state)
    }
    case success(EDIT_MANUFACTURER): {
      const { manufacturer } = action.data

      return {
        ...state, 
        manufacturer,
        status: STATE_STATUSES.READY
      } 
    }
    case error(EDIT_MANUFACTURER): {
      return errorReducer(state)
    }

    case DELETE_MANUFACTURER: {
      return processReducer(state)
    }
    case success(DELETE_MANUFACTURER): {
      const manufacturers = state.manufacturers.filter(item => item.id !== action.meta.id)

      return {
        ...state,
        manufacturers,
        status: STATE_STATUSES.READY
      }
    }
    case error(DELETE_MANUFACTURER): {
      return errorReducer(state)
    }

    //brands
    case GET_BRANDS: {
      return processReducer(state)
    }
    case success(GET_BRANDS): {
      const { brands } = action.data

      return {
        ...state, brands, status: STATE_STATUSES.READY
      } 
    }
    case error(GET_BRANDS): {
      return errorReducer(state)
    }

    case GET_BRAND: {
      return processReducer(state)
    }
    case success(GET_BRAND): {
      const { brand } = action.data

      return {
        ...state, brand, status: STATE_STATUSES.READY
      } 
    }
    case error(GET_BRAND): {
      return errorReducer(state)
    }

    case CREATE_BRAND_MANUFACTURERS: {
      return processReducer(state)
    }
    case success(CREATE_BRAND_MANUFACTURERS): {
      const { brand } = action.data

      return {
        ...state,
        manufacturer: {...state.manufacturer, brands: [...state.manufacturer.brands, brand]},
        status: STATE_STATUSES.READY
      }
    }
    case error(CREATE_BRAND_MANUFACTURERS): {
      return errorReducer(state)
    }

    case CREATE_BRAND_BRANDS: {
      return processReducer(state)
    }
    case success(CREATE_BRAND_BRANDS): {
      const { brand } = action.data

      return {
        ...state,
        brands: [...state.brands, brand], 
        status: STATE_STATUSES.READY
      }
    }
    case error(CREATE_BRAND_BRANDS): {
      return errorReducer(state)
    }

    case EDIT_BRAND: {
      return processReducer(state)
    }
    case success(EDIT_BRAND): {
      const { brand } = action.data

      return {
        ...state, 
        brand,
        status: STATE_STATUSES.READY
      } 
    }
    case error(EDIT_BRAND): {
      return errorReducer(state)
    }

    case MANUFACTURER_DELETE_BRAND: {
      return processReducer(state)
    }
    case success(MANUFACTURER_DELETE_BRAND): {
      const brands = state.manufacturer.brands.filter(item => item.id !== action.meta.id)

      return {
        ...state,
        manufacturer: {...state.manufacturer, brands},
        status: STATE_STATUSES.READY
      }
    }
    case error(MANUFACTURER_DELETE_BRAND): {
      return errorReducer(state)
    }

    case DELETE_BRAND: {
      return processReducer(state)
    }
    case success(DELETE_BRAND): {
      const brands = state.brands.filter(item => item.id !== action.meta.id)

      return {
        ...state,
        brands,
        status: STATE_STATUSES.READY
      }
    }
    case error(DELETE_BRAND): {
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
