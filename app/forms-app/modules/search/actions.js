import * as t from './actionTypes';
import ApiClient from '../../../ApiClient';
import { batchActions } from '../../../redux/utils/batch';
import { searchEntitiesByAttr } from '../entities/selectors';

export function search(query) {
  return function(dispatch, getState) {
    const uri = `/api/search`;
    dispatch(fetchRequest());
    dispatch(setQuery(query));

    //fake API call START

    const state = getState();
    const result = searchEntitiesByAttr(state, "users", "surname", query);

    //fake API call END

    dispatch(fetchSuccess(result));
  }
}

export function setQuery(str) {
  return {
    type: t.SET_QUERY,
    payload: {
      query: str
    }
  }
}

export function clear() {
  return {
    type: t.CLEAR,
  }
}

function fetchRequest() {
  return {
    type: t.FETCH_REQUEST
  }
}

function fetchSuccess(result) {
  return {
    type: t.FETCH_SUCCESS,
    payload: {
      result
    }
  }
}

function fetchFailure(error) {
  return {
    type: t.FETCH_FAILURE,
    error
  }
}