import * as ActionType from '../actionTypes'
import { feedListMap } from '../../common/constanst';

const initialState = {
  isFetching: false,
  homeList: {
    page: undefined,
    totalPages: undefined,
    data: undefined,
  },
  delicacyList: {
    page: undefined,
    totalPages: undefined,
    data: undefined,
  },
  evaluateList: {
    page: undefined,
    totalPages: undefined,
    data: undefined,
  },
  knowledgeList: {
    page: undefined,
    totalPages: undefined,
    data: undefined,
  },
}

export function feedReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.GET_FEED:
      return {
        ...state,
        isFetching: true
      }
    case ActionType.SET_FEED: {
      const { categoryId, response } = action.payload;
      const listName = feedListMap[categoryId];
      const { page, total_pages, feeds } = response;
      // const filteredFeeds = feeds.filter(feed => feed.content_type === 5)
      return {
        ...state,
        isFetching: false,
        [listName]: {
          ...state[listName],
          page: parseInt(page, 10),
          totalPages: total_pages,
          data: state[listName].data ? [...state[listName].data, ...feeds] : feeds
        }
      }
    }
    default:
      return state
  }
}