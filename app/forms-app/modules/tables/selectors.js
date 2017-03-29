import { NAME } from './constants';

export const getAll = (state) => state[NAME];
export const getTable = (state, tableID) => getAll(state)[tableID];

export const makeSortSelector = (tableID) => {
  return (state) => getTable(state, tableID).sort;
}

export const makeFilterSelector = (tableID) => {
  return (state) => getTable(state, tableID).filter;
}