import * as t from './actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case t.ADD:
      return addEntries(state, action);

    case t.REMOVE:
      return removeEntry(state, action);

    case t.COPY:
      return copyEntry(state, action);

    case t.UPDATE:
      return updateEntry(state, action);

    default:
      return state;
  }
}

function addEntries(state, action) {
  const {
    entityName,
    entries
  } = action.payload;

  const entityState = state[entityName] || {};
  const entities = entityState.entities || {};

  return Object.assign({}, state, {
    [entityName]: Object.assign({}, entityState, {
      entities: Object.assign({}, entities, entries)
    })
  });
}

function removeEntry(state, action) {
  const {
    entityName,
    id
  } = action.payload;

  const entityStateCopy = Object.assign({}, state[entityName]);
  delete entityStateCopy.entities[id];
  return Object.assign({}, state, {
    [entityName]: entityStateCopy
  });
}

function copyEntry(state, action) {
  const {
    entityName,
    id,
    copyId
  } = action.payload;

  const origin = state[entityName].entities[id];

  return Object.assign({}, state, {
    [entityName]: Object.assign({}, state[entityName], {
      entities: Object.assign({}, state[entityName].entities, {
        [copyId]: Object.assign({}, origin)
      })
    })
  });
}

function updateEntry(state, action) {
  const {
    entityName,
    id,
    changes
  } = action.payload;

  const origin = state[entityName].entities[id];

  return Object.assign({}, state, {
    [entityName]: Object.assign({}, state[entityName], {
      entities: Object.assign({}, state[entityName].entities, {
        [id]: Object.assign({}, origin, changes)
      })
    })
  });
}