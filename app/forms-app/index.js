import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { configureStoreClient } from '../redux/create';
import rootReducer from './reducer';
import FormsListApp from './components';

// Grab the state from a global variable injected into the server-generated HTML
let preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = configureStoreClient(rootReducer, preloadedState);

render(
  <Provider store={store}>
	   <FormsListApp />
  </Provider>,
  document.getElementById('root')
);