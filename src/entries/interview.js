import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore'

import FormInterviewApp from '../containers/FormInterviewApp';

import { combineReducers } from 'redux';
import { formData, modal } from '../reducers';
import { forms } from 'react-super-forms';

const rootReducer = combineReducers({
  formData,
  forms,
  modal
});

const store = configureStore({}, rootReducer);

render(
  <Provider store={store}>
    <FormInterviewApp/>
  </Provider>,
  document.getElementById('root')
);