import { createSelector } from 'reselect';

import { NAME } from './constants';
import { getEntityState } from '../entities/selectors';
import { naturalSort } from './utils';

export const getLocalState = (state) => state[NAME];
export const getListState = (state, list) => {
  return getLocalState(state)[list] || {};
}

export const getConnectedEntities = (state, props) => {
  return getListState(state, props.list).entities;
}

export const getKeyEntity = (state, props) => {
  return getListState(state, props.list).keyEntity;
}

export const getEntries = (state, props) => {
  return getListState(state, props.list).entries || [];
}

export const getSortKey = (state, props) => {
  return getListState(state, props.list).sortKey;
}

export const getSortDirection = (state, props) => {
  return getListState(state, props.list).direction;
}

export const getLoading = (state, props) => {
  return getListState(state, props.list).loading;
}

export const getSort = createSelector(
  getSortKey,
  getSortDirection,
  (sortKey, direction) => ({
    sortKey,
    direction,
  })
);

export const makeGetSortedEntries = (connectedEntities) => {

  console.log("createSelector");

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

  const getFormsEntities = (state) => getEntityState(state, "forms");

  const getDESCList = createSelector(
    getEntries,
    getConEntitiesState,
    getSortKey,
    (entries, conEntitiesState, key) => {
      console.log("resort");
      return sort(entries, conEntitiesState, key);
    }
  );

  const getSortedList = createSelector(
    getDESCList,
    getSortDirection,
    (forms, dir) => {
      console.log("change direction")

      return dir === "asc" ?
        Object.assign([], forms).reverse() :
        forms;
    }
  );

  return getSortedList;
}

function sort(entries, conEntitiesState, key) {

  //TODO: extract to utils
  function getFromDotPath(entry, key) {
    const path = key.split('.');
    const entyName = path[0];
    const entyId = entry[entyName];
    const enty = conEntitiesState[entyName][entyId];

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