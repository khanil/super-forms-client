import { combineReducers } from 'redux';

import entities from './modules/entities';
import formsLists from './modules/formsLists';
import modal from './modules/modal';
import session from './modules/session';

export default combineReducers({
  [entities.constants.NAME]: entities.reducer,
  [formsLists.constants.NAME]: formsLists.reducer,
  [modal.constants.NAME]: modal.reducer,
  [session.constants.NAME]: session.reducer,
});