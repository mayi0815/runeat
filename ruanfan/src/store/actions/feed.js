import * as ActionType from '../actionTypes'

export const getFeed = (categoryId, page) => ({
  type: ActionType.GET_FEED,
  payload: {
    page,
    category: categoryId,
    per: 10
  }
})

export const setFeed = (categoryId, response) => ({
  type: ActionType.SET_FEED,
  payload: { categoryId, response }
}) 