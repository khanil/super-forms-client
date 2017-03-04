import { NAME } from './constants';
import { forms } from './model';

export const getAll = (state) => state[NAME];
export const getForms = (state) => forms.getForms(state);