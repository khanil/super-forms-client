import * as t from './actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case t.ADD:
      return addEntry(state, action);

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

function addEntry(state, action) {
  const {
    entityName,
    id,
    entry
  } = actions.payload;

  return Object.assign({}, state, {
    [entityName]: Object.assign({}, state[entityName], {
      entities: Object.assign({}, state[entityName].entities, {
        [id]: entry
      })
    })
  });
}

function removeEntry(state, actions) {
  const {
    entityName,
    id
  } = actions.payload;

  const entityStateCopy = Object.assign({}, state[entityName]);
  delete entityStateCopy.entities[id];
  return Object.assign({}, state, {
    [entityName]: entityStateCopy
  });
}

function copyEntry(state, actions) {
  const {
    entityName,
    id,
    copyId
  } = actions.payload;

  const origin = state[entityName].entities[id];

  return Object.assign({}, state, {
    [entityName]: Object.assign({}, state[entityName], {
      entities: Object.assign({}, state[entityName].entities, {
        [copyId]: Object.assign({}, origin)
      })
    })
  });
}

function updateEntry(state, actions) {
  const {
    entityName,
    id,
    changes
  } = actions.payload;

  const origin = state[entityName].entities[id];

  return Object.assign({}, state, {
    [entityName]: Object.assign({}, state[entityName], {
      entities: Object.assign({}, state[entityName].entities, {
        [id]: Object.assign({}, origin, changes)
      })
    })
  });
}