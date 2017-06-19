import * as t from './actionTypes';

export function add(list, config) {
  return {
    type: t.ADD,
    payload: {
      config,
      list
    }
  };
}

export function remove(list) {
  return {
    type: t.REMOVE,
    payload: {
      list
    }
  }
}

export function sortEntries(list, sortKey) {
  return {
    type: t.SORT,
    payload: {
      list,
      sortKey
    }
  }
}

export function initEntries(list, entries) {
  return {
    type: t.INIT_ENTRIES,
    payload: {
      list,
      entries
    }
  }
}

export function addEntries(list, entries) {
  return {
    type: t.ADD_ENTRIES,
    payload: {
      list,
      entries
    }
  }
}

export function removeEntries(list, entries) {
  return {
    type: t.REMOVE_ENTRIES,
    payload: {
      list,
      entries
    }
  }
}

export function fetchRequest(list) {
  return {
    type: t.FETCH_REQUEST,
    payload: {
      list
    }
  }
}

export function fetchSuccess(list) {
  return {
    type: t.FETCH_SUCCESS,
    payload: {
      list,
    }
  }
}

export function fetchFailure(list, error) {
  return {
    type: t.FETCH_FAILURE,
    payload: {
      list
    },
    error
  }
}