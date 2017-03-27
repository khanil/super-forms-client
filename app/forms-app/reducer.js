import { combineReducers } from 'redux';

import forms from './modules/forms';
import modal from './modules/modal';
import tables from './modules/tables';

export default combineReducers({
  [forms.constants.NAME]: forms.reducer,
  [modal.constants.NAME]: modal.reducer,
  [tables.constants.NAME]: tables.reducer,
  // User for form copy
  user: (state = null) => state
});