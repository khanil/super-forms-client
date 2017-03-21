import { combineReducers } from 'redux';

import forms from './modules/forms';
import modal from './modules/modal';

export default combineReducers({
  [forms.constants.NAME]: forms.reducer,
  [modal.constants.NAME]: modal.reducer,
  // User for form copy
  user: (state = null) => state
});