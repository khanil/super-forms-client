import { combineReducers } from 'redux';

import forms from './modules/forms';
import modal from './modules/modal';
import session from './modules/session';
import tables from './modules/tables';
import entities from './modules/entities';
import userForms from './modules/userForms';

export default combineReducers({
  [forms.constants.NAME]: forms.reducer,
  [modal.constants.NAME]: modal.reducer,
  [session.constants.NAME]: session.reducer,
  [tables.constants.NAME]: tables.reducer,
  [entities.constants.NAME]: entities.reducer,
  [userForms.constants.NAME]: userForms.reducer,
});