import { createSelector } from 'reselect';

import { NAME } from './constants';
import { getEntityState, getEntity } from '../entities/selectors';
import { naturalSort } from './utils';

export const getLocalState = (state) => state[NAME];

export const getListState = (state, list) => {
  return getLocalState(state)[list] || {};
}

export function getProperty(state, list, prop) {
  const listState = getListState(state, list);
  return listState[prop];
}

export const getEntries = (state, props) => {
  return getListState(state, props.list).entries || [];
}

export const getSort = createSelector(
  (state, props) => getProperty(state, props.list, "sortKey"),
  (state, props) => getProperty(state, props.list, "direction"),
  (sortKey, direction) => ({
    sortKey,
    direction,
  })
);

export const makeGetSortedEntries = (connectedEntities) => {
  const createConEntyStateGetters = connectedEntities.map((conEnty) => (
    (state, props) => getEntityState(state, conEnty)
  ));

  const getConEntitiesState = createSelector(
    createConEntyStateGetters,
    (...conEntyStates) => {
      let state = {};
      connectedEntities.forEach((enty, i) => {
        state[enty] = conEntyStates[i];
      });
      return state;
    }
  );

  const getDESCList = createSelector(
    getEntries,
    getConEntitiesState,
    (state, props) => getProperty(state, props.list, "sortKey"),
    (entries, conEntitiesState, key) => {
      return sort(entries, conEntitiesState, key);
    }
  );

  const getSortedList = createSelector(
    getDESCList,
    (state, props) => getProperty(state, props.list, "direction"),
    (forms, dir) => {
      return dir === "asc" ?
        Object.assign([], forms).reverse() :
        forms;
    }
  );

  return getSortedList;
}

export function makeGetEntry(connectedEntities) {
  const createConEntyStateGetters = connectedEntities.map((conEnty) => (
    (state, props) => getEntityState(state, conEnty)
  ));

  const getConEntitiesState = createSelector(
    createConEntyStateGetters,
    (...conEntyStates) => {
      let state = {};
      connectedEntities.forEach((enty, i) => {
        state[enty] = conEntyStates[i];
      });
      return state;
    }
  );

  return createSelector(
    getConEntitiesState,
    (state, props) => props.entry,
    (state, entry) => {
      const data = {};
      Object.keys(entry).forEach((entity) => {
        let entityId = entry[entity];
        data[entity] = state[entity].entities[entityId];
      });
      return data;
    }
  );
}

function sort(entries, conEntitiesState, key) {
  function getFromDotPath(entry, key) {
    const path = key.split('.');
    const entyName = path[0];
    const entyId = entry[entyName];
    const enty = conEntitiesState[entyName].entities[entyId];

    return path.slice(1).reduce((obj, subKey) => obj[subKey], enty);
  }

  return entries.sort(
    (entry1, entry2) => (
      -naturalSort(
        getFromDotPath(entry1, key),
        getFromDotPath(entry2, key)
      )
    )
  );
}