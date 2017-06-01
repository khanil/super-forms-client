import { combineReducers } from 'redux';

import entities from './modules/entities';
import entityLists from './modules/entityLists';
import modal from './modules/modal';
import session from './modules/session';

import { ORG, PERSONAL } from './utils/listsConfig';

export default combineReducers({
  [entities.constants.NAME]: entities.reducer,
  [entityLists.constants.NAME]: entityLists.createReducer({
    org: ORG,
    personal: PERSONAL
  }),
  [modal.constants.NAME]: modal.reducer,
  [session.constants.NAME]: session.reducer,
});