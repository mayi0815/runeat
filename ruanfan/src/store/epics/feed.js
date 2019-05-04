import * as ActionType from '../actionTypes';
import { ajax } from 'rxjs/ajax';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { setFeed } from '../actions/feed';
import { formatUrl } from '../../common/HttpTool';

const getUrl = (params) => formatUrl({url: 'http://food.boohee.com/fb/v1/feeds/category_feed', params})

export const feedEpic = action$ =>
  action$.pipe(
    ofType(ActionType.GET_FEED),
    mergeMap(action => 
      ajax.getJSON(getUrl(action.payload)).pipe(
        map(response => setFeed(action.payload.category, response)),
        catchError(error => of({
          type: FETCH_USER_REJECTED,
          payload: error.xhr.response,
          error: true
        }))
      )
    )
  )