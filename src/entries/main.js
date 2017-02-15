import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../redux/create';

import MainPageApp from '../containers/MainPageApp';

import { combineReducers } from 'redux';
import app from '../redux/modules/mainPageApp';
import config from '../redux/modules/config';
import modal from '../redux/modules/mainPageModal';

const rootReducer = combineReducers({
  app,
  config,
  modal
});

const store = configureStore({}, rootReducer);

render(
  <Provider store={store}>
    <MainPageApp/>
  </Provider>,
  document.getElementById('root')
);