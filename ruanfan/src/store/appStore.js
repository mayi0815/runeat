import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from './epics';

// const maybeItem = localStorage.getItem("reduxState");
// const persistedState = maybeItem ? JSON.parse(maybeItem) : {};

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify here name, actionsBlacklist, actionsCreators and other options
      })
    : compose;

const epicMiddleware = createEpicMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(epicMiddleware)
  // other store enhancers if any
);

const store = createStore(rootReducer, enhancer);

epicMiddleware.run(rootEpic);

// store.subscribe(() =>
//   localStorage.setItem("reduxState", JSON.stringify(store.getState()))
// );

export default store;

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
