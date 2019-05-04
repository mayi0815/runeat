import * as ActionType from '../actionTypes'

const initialState = {
  name: ''
}

export function accountReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.SET_USER_NAME:
      return {
        ...state,
        name: action.payload
      }
    default:
      return state
  }
}