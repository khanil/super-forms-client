import { NAME } from './constants';

export const getLocalState = (state) => state[NAME];

export const getEntitiesState = (state, entityName) => {
  return getLocalState(state)[entityName] || {};
}

export const getEntity = (state, entityName, id) => {
  const entitiesState = getEntitiesState(state, entityName);
  return entitiesState[id];
}