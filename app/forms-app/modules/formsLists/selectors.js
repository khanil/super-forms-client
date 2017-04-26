import { createSelector } from 'reselect';

import { NAME } from './constants';
import { getEntityState } from '../entities/selectors';

export const getLocalState = (state) => state[NAME];
export const getListState = (state, list) => {
  return getLocalState(state)[list] || {};
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

export const getSort = createSelector(
  getSortKey,
  getSortDirection,
  (sortKey, direction) => ({
    sortKey,
    direction,
  })
);

export const makeGetSortedEntries = () => {
  const getFormsEntities = (state) => getEntityState(state, "forms");

  const getDESCList = createSelector(
    getEntries,
    getFormsEntities,
    getSortKey,
    (entries, forms, key) => {
      return sort(entries, forms, key);
    }
  );

  const getSortedList = createSelector(
    getDESCList,
    getSortDirection,
    (forms, dir) => {
      return dir === "asc" ?
        Object.assign([], forms).reverse() :
        forms;
    }
  );

  return getSortedList;
}

function sort(entries, forms, key) {

  return entries.sort(
    (id1, id2) => compareNumber(forms[id1][key], forms[id2][key])
  );
}

function compareNumber(a, b) {
  return b - a;
}

function compareStrings(a, b) {
  const va = (a === null) ? "" : "" + a;
  const vb = (b === null) ? "" : "" + b;

  return va > vb ? 1 : ( va === vb ? 0 : -1);
}