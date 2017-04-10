import { combineReducers } from 'redux';

import forms from './forms';
import users from './users';

export default combineReducers({
  [forms.constants.NAME]: forms.reducer,
  [users.constants.NAME]: users.reducer,
});