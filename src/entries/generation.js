import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore'

import FormGeneratonApp from '../containers/FormGenerationApp';

import { combineReducers } from 'redux';
import { formData, modal } from '../reducers';
import forms from '../reducers/forms';

const rootReducer = combineReducers({
  formData,
  forms,
  modal
});

const store = configureStore({}, rootReducer);

render(
  <Provider store={store}>
    <FormGeneratonApp/>
  </Provider>,
  document.getElementById('root')
);