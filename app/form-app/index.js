import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { configureStoreClient } from '../redux/create';
import rootReducer from './reducer';
import App from './containers';

const store = configureStoreClient(
  rootReducer,
  {}
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);