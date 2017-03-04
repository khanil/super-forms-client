import { combineReducers } from 'redux';

import form from './modules/form';
import responses from './modules/responses';

export default combineReducers({
  [form.constants.NAME]: form.reducer,
  [responses.constants.NAME]: responses.reducer
});