export function add(state, forms) {
  return Object.assign({}, state, {
    entities: Object.assign({}, state.entities, forms)
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