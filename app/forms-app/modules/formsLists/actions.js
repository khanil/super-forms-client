import * as t from './actionTypes';
import ApiClient from '../../../ApiClient';
import { batchActions } from '../../../redux/utils/batch';
import { add as addEntities } from '../entities/actions';
//TODO: REMOVE
import forms from '../forms';
import { getSort } from './selectors';

export function fetchOrg(list) {
  const uri = `/api/journal`;
  return fetch(list, uri);
}

export function fetchUser(list, userID) {
  const uri = `/api/forms`;
  return fetch(list, uri);
}

export function fetch(list, uri) {
  return (dispatch) => {
    dispatch( fetchRequest(list) );

    new ApiClient().get(uri)
      .then((result) => {
        const {
          entities,
          entries,
        } = forms.model.init(result);

        dispatch(
          batchActions(
            addEntities(entities),
            fetchSuccess(list, entries),
          )
        );
      })
      .catch((error) => {
        console.error(error);
        dispatch(fetchFailure(list, error.message));
      });
  };
}

function fetchRequest(list) {
  return {
    type: t.FETCH_REQUEST,
    meta: {
      list
    }
  }
}

function fetchSuccess(list, entries) {
  return {
    type: t.FETCH_SUCCESS,
    meta: {
      list
    },
    payload: {
      entries
    }
  }
}

function fetchFailure(list, error) {
  return {
    type: t.FETCH_FAILURE,
    meta: {
      list
    },
    error
  }
}

export function sortClient(list, sortKey) {
  return (dispatch, getState) => {
    let direction = "desc";
    const state = getState();
    const lastSort = getSort(state, { list });

    if (lastSort.sortKey == sortKey) {
      direction = reverseDirection(lastSort.direction);
    }

    dispatch( sort(list, sortKey, direction) );
  }
}

function reverseDirection(curDirection) {
  return curDirection == "asc" ?
    "desc" :
    "asc";
}

function sort(list, sortKey, direction) {
  return {
    type: t.SORT,
    meta: {
      list,
      sortKey,
      direction,
    }
  }
}

export function inject(list, { id, index }) {
  return {
    type: t.INJECT,
    meta: {
      list,
      id,
      index,
    }
  }
}

