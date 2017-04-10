export function add(state, users) {
  return Object.assign({}, state, {
    entities: Object.assign({}, state.entities, users)
  });
}

export function getAll(state) {
  const entities = getEntities(state);
}

export function getEntities(state) {
  return state.entities;
}

export function get(state, id) {
  const entities = getEntities(state);
  return entities[id];
}