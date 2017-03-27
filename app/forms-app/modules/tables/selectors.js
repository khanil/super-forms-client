import { NAME } from './constants';

export const getAll = (state) => state[NAME];

// export const getSort = (state, props) => {
//   console.log(getAll(state)[props.table]);

//   return getAll(state)[props.table].sort;
// }

export const makeSortSelector = (table) => {
  return (state) => getAll(state)[table].sort;
}