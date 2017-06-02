import { NAME } from './constants';

export const getLocalState = (state) => state[NAME];

export const getEntityState = (state, entityName) => {
  return getLocalState(state)[entityName] || {};
}

export const getEntity = (state, entityName, id) => {
  const entityState = getEntityState(state, entityName);
  return entityState.entities[id];
}