import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger';
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import  {composeWithDevTools} from 'redux-devtools-extension';



const middlewareEnhancers = applyMiddleware(logger,thunkMiddleware);
const composedEnhancers = composeWithDevTools(middlewareEnhancers);
const store = createStore(rootReducer,composedEnhancers);

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  export default store;