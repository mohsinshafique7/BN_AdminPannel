import { success, error } from 'redux-saga-requests'
import { GET_SCRAPPER_SETTINGS, RETAILER_DROP_TODAY, SCRAPPER_RUN, SET_RESULT } from './action'
import { STATE_STATUSES } from '../../utils/app'

const initialState = {
  scraperSetting: {},
  initialSettingJson: {
    "settings": {
      "selectors": {
        "banners": {
          "list": "string",
          "title": "string"
        },
        "products": {
          "aisle": "string",
          "search": "string",
          "shelf": "string",
          "lastPage": "string",
          "nextPage": "string",
          "list": "string",
          "noProducts": {
            "search": "string",
            "aisle": "string",
            "shelf": "string"
          }
        },
        "taxonomy": {
          "list": "string"
        },
        "shelfData": {
          "parentCategory": "string",
          "categories": "string"
        },
        "product": {
          "productBrand": "string",
          "productImage": "string",
          "productTitle": "string",
          "productDescription": "string",
          "ean": "string",
          "productPrice": "string",
          "secondaryImages": "string",
          "reviewsStars": "string",
          "reviewsCount": "string",
          "productInStock": "string",
          "jsonObject": "string",
          "features": "string",
          "promotionDescription": "string",
          "promotions": "string",
          "productInfo": "string",
          "weight": "string",
          "pricePerWeight": "string",
          "nutritional": "string"
        }
      },
      "products": {
        "count": "string",
        "catalogURL": "string",
        "productURL": "string"
      },
      "product": {},
      "taxonomy": {
        "nameValid": [],
        "page": "string",
        "source": "string"
      },
      "brokenLink": {
        "path": "string",
        "selector": "string"
      }
    }
  },
  result: false,
  status: STATE_STATUSES.INIT
}

export default (state = initialState, action) => {
  switch(action.type) {
    //scraperSettings
    case GET_SCRAPPER_SETTINGS: {
      return processReducer(state)
    }
    case success(GET_SCRAPPER_SETTINGS): {
      return {
        ...state, 
        scraperSetting: action.data,
        status: STATE_STATUSES.READY
      } 
    }
    case error(GET_SCRAPPER_SETTINGS): {
      return errorReducer(state)
    }

    case RETAILER_DROP_TODAY: {
      return processReducer(state)
    }
    case success(RETAILER_DROP_TODAY): {
      return {
        ...state, 
        result: action.data.result,
        status: STATE_STATUSES.READY
      } 
    }
    case error(RETAILER_DROP_TODAY): {
      return errorReducer(state)
    }

    case SCRAPPER_RUN: {
      return processReducer(state)
    }
    case success(SCRAPPER_RUN): {
      return {
        ...state, 
        status: STATE_STATUSES.READY
      } 
    }
    case error(SCRAPPER_RUN): {
      return errorReducer(state)
    }

    case SET_RESULT: {
      return {
        ...state, 
        result: action.value
      } 
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
