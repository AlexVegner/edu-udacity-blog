import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';

const configureStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const loggerMiddleware = createLogger();

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
  );

  return store;
};

export default configureStore;
