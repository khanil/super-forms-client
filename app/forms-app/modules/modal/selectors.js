import { NAME } from './constants';

export const getAll = (state) => state[NAME];
export const getId = (state) => getAll(state).id;
export const getPayload = (state) => getAll(state).payload;