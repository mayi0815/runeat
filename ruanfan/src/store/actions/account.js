import * as ActionType from '../actionTypes'

export const setUserName = (name) => ({
  type: ActionType.SET_USER_NAME,
  payload: name
})