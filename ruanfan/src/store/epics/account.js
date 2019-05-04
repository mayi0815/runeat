import * as ActionType from '../actionTypes';
import { ajax } from 'rxjs/ajax';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { setUserName } from '../actions/account';

export const accountEpic = action$ =>
  action$.pipe(
    ofType(ActionType.GET_USER),
    mergeMap(action => 
      ajax.getJSON('some_end_point').pipe(
        map(response => setUserName(response)),
        catchError(error => of({
          type: FETCH_USER_REJECTED,
          payload: error.xhr.response,
          error: true
        }))
      )
    )
  )
