import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';
import { routerMiddleware } from 'react-router-redux'

const configureStore = (browserHistory) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const loggerMiddleware = createLogger();

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware, routerMiddleware(browserHistory)))
  );

  return store;
};

export default configureStore;
