import { NAME } from './constants';

export const getAll = (state) => state[NAME];
export const getResponses = (state) => getAll(state).entities;
export const getFetchedLast = (state) => getAll(state).fetchedLast;