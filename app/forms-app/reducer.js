import { combineReducers } from 'redux';

// import forms from './modules/forms';
import modal from './modules/modal';
import session from './modules/session';
// import tables from './modules/tables';
import entities from './modules/entities';
import userForms from './modules/userForms';
import search from './modules/search';

export default combineReducers({
  [entities.constants.NAME]: entities.reducer,
  // [forms.constants.NAME]: forms.reducer,
  [modal.constants.NAME]: modal.reducer,
  [search.constants.NAME]: search.reducer,
  [session.constants.NAME]: session.reducer,
  // [tables.constants.NAME]: tables.reducer,
  [userForms.constants.NAME]: userForms.reducer,
});