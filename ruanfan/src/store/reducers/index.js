
/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */

//here the initial state should get from server right after create store
//see http://stackoverflow.com/a/33924707/6849186

import { combineReducers } from 'redux';
import { appReducer } from './app';

const initialUserInvoicesState = {
  invoices: []
}

export function userInvoicesReducer(state: UserInvoices = initialUserInvoicesState, action: Action) {
  switch (action.type) {
    case actions.GET_USER_INVOICES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state
  }
}

const rootReducer = combineReducers({
  appInfo: appReducer,
  // userInfo: userInfoReducer,
  // invoiceInfo: invoiceInfoReducer,
  // userInvoices: userInvoicesReducer,
})

export default rootReducer;