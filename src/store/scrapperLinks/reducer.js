import { success, error } from 'redux-saga-requests'
import { GET_SCREPPER_LINKS,
  GET_SCREPPER_LINK,
  CREATE_SCREPPER_LINK,
  EDIT_SCREPPER_LINK } from './action'
import { STATE_STATUSES } from '../../utils/app'

const initialState = {
  scrapperLinks: [],
  scrapperLink: {},
  status: STATE_STATUSES.INIT
}

export default (state = initialState, action) => {
  switch(action.type) {
    //ScrapperLinks
    case GET_SCREPPER_LINKS: {
      return processReducer(state)
    }
    case success(GET_SCREPPER_LINKS): {
      const { scrapperLinks } = action.data

      return {
        ...state, scrapperLinks, status: STATE_STATUSES.READY
      } 
    }
    case error(GET_SCREPPER_LINKS): {
      return errorReducer(state)
    }

    case GET_SCREPPER_LINK: {
      return processReducer(state)
    }
    case success(GET_SCREPPER_LINK): {
      const { scrapperLink } = action.data

      return {
        ...state, scrapperLink, status: STATE_STATUSES.READY
      } 
    }
    case error(GET_SCREPPER_LINK): {
      return errorReducer(state)
    }


    case CREATE_SCREPPER_LINK: {
      return processReducer(state)
    }
    case success(CREATE_SCREPPER_LINK): {
      const { scrapperLink } = action.data

      return {
        ...state, 
        scrapperLinks: [...state.scrapperLinks, scrapperLink], 
        status: STATE_STATUSES.READY
      } 
    }
    case error(CREATE_SCREPPER_LINK): {
      return errorReducer(state)
    }


    case EDIT_SCREPPER_LINK: {
      return processReducer(state)
    }
    case success(EDIT_SCREPPER_LINK): {
      const { scrapperLink } = action.data

      return {
        ...state, 
        scrapperLink,
        status: STATE_STATUSES.READY
      } 
    }
    case error(EDIT_SCREPPER_LINK): {
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
