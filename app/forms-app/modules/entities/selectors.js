import { NAME } from './constants';

export const getAll = (state) => state[NAME];

export const getEntityState = (state, entity) => {
  return getAll(state)[entity].entities;
}

export const getEntity = (state, entity, id) => {
  const store = getAll(state)[entity];
  return store.entities[id];
}

export const searchEntitiesByAttr = (state, entityName, attr, query) => {
  const store = getAll(state)[entityName];
  const entities = store.entities;
  const test_query = new RegExp(`^${query}`, 'i');
  let result = [];

  for (let id in entities) {
    let entity = entities[id];
    if ( test_query.test( entity[attr] ) ) {
      result.push(id);
    }
  }

  return result;
}