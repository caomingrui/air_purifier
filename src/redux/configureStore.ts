import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpics, rootReducers } from './combine';

const epicMiddleware = createEpicMiddleware();

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
const logger = createLogger({
  // eslint-disable-next-line no-unused-vars
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true
});

const middlewares: Middleware[] = [epicMiddleware];

if (isDebuggingInChrome) {
  middlewares.push(logger);
}

export default function configureStore(initialState: any = undefined): any {
  const applyedMiddleware = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducers,
    initialState,
    compose(
      applyedMiddleware,
      isDebuggingInChrome && window.devToolsExtension ? window.devToolsExtension() : (f: any) => f
    )
  );

  epicMiddleware.run(rootEpics);
  return store;
}
