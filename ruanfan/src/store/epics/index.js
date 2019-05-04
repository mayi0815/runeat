import { combineEpics } from 'redux-observable';
import { accountEpic } from './account';
import { feedEpic } from './feed';

const rootEpic = combineEpics(
  accountEpic,
  feedEpic,
);

export default rootEpic;