import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './routes';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';

const renderApp = () => render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./routes', renderApp);
}

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
