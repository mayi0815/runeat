import * as ActionType from '../actionTypes'

const initialState = {
  barStyle: 'light-content'
}

export function appReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.UPDATE_BAR_STYLE:
      return {
        ...state,
        barStyle: action.payload
      }
    default:
      return state
  }
}