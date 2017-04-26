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

export const getSort = (state, props) => {
  const listState = getListState(state, props.list);

  return {
    sortKey: listState.sortKey,
    direction: listState.direction,
  };
}

export const getSortKey = (state, props) => {
  return getListState(state, props.list).sortKey;
}

export const getSortDirection = (state, props) => {
  return getListState(state, props.list).direction;
}

export const makeGetForms = () => {
  const getUsersEntities = (state) => getEntityState(state, "users");
  const getFormsEntities = (state) => getEntityState(state, "forms");

  const getFormsList = createSelector(
    getEntries,
    getFormsEntities,
    getUsersEntities,
    (entries, forms, users) => {
      return entries.map((formID) => {
        const form = forms[formID];
        const userID = form["user_id"];
        const user = users[userID];
        return {
          ...form,
          ...user,
        };
      });
    }
  );

  const getDESCList = createSelector(
    getFormsList,
    getSortKey,
    (forms, key) => {
      return sort(forms, key);
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

function sort(forms, key) {
  return forms.sort((a, b) => compareNumber(a[key], b[key]));
}

function compareNumber(a, b) {
  return b - a;
}

function compareStrings(a, b) {
  const va = (a === null) ? "" : "" + a;
  const vb = (b === null) ? "" : "" + b;

  return va > vb ? 1 : ( va === vb ? 0 : -1);
}