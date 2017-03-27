import { createSelector } from 'reselect';

import { NAME } from './constants';
import { forms } from './model';

import { getSort } from '../tables/selectors';

export const getAll = (state) => state[NAME];

export const getDB = (state) => getAll(state).db;


export function makeFormsSelector(sortSelector) {

  const getSortField = (state) => sortSelector(state).key;
  const getSortDataType = (state) => sortSelector(state).type;
  const getSortDir = (state) => sortSelector(state).order;

  const getAscSortedForms = createSelector(
    getDB,
    getSortField,
    getSortDataType,
    (db, field, compareType) => {
      console.log("getAscSortedForms recount");
      return forms.getForms(db, {
        field,
        type: compareType
      });
    }
  );

  const getSortedForms = createSelector(
    getAscSortedForms,
    getSortDir,
    (formsList, dir) => {
      console.log("getSortedForms recount");

      if (dir === 'desc') {
        return formsList.slice().reverse();
      }

      return formsList;
    }
  );

  return (state) => getSortedForms(state);
}

export const getForm = (state, formId) => {
  const db = getAll(state).db;
  return forms.get(db, formId);
}