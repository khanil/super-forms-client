import { NAME } from './constants';

export const getAll = (state) => state[NAME];
export const getUser = (state) => getAll(state).user;
export const getTab = (state) => getAll(state).tab;