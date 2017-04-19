export function add(state, action) {
  const entities = action.payload;

  return Object.keys(entities).reduce((prevState, key) => {
    const entityStore = prevState[key];
    const addition = entities[key];
    return Object.assign({}, prevState, {
      [key]: Object.assign({}, entityStore, {
        entities: Object.assign({}, entityStore.entities, addition)
      })
    })
  }, state);
};