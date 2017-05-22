import { createSelector } from 'reselect';

import { NAME } from './constants';
import { getEntityState } from '../entities/selectors';
import { naturalSort } from './utils';

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

  //TODO: extract to utils
  function getFromDotPath(data, key) {
    return key.split('.').reduce((obj, subKey) => obj[subKey], data);
  }

  return entries.sort(
    (id1, id2) => -naturalSort(
      getFromDotPath(forms[id1], key),
      getFromDotPath(forms[id2], key)
    )
  );
}