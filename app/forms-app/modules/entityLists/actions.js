import * as t from './actionTypes';
import * as AC from './actionCreators';
import ApiClient from '../../../ApiClient';
import { batchActions } from '../../../redux/utils/batch';

import { add as addEntities } from '../entities/actions';
import { setDefaultList } from '../session/actions';
import { normalizeFormsList } from './utils';
import { getSort } from './selectors';

export * from './actionCreators';

// TODO: this is костыль!
export function fetchOrg() {
  const uri = `/api/journal`;
  return fetchEntries("org", uri);
}

export function fetchUser() {
  const uri = `/api/forms`;
  return fetchEntries("personal", uri);
}
//

export function fetchEntries(list, uri) {
  return (dispatch) => {
    dispatch( AC.fetchRequest(list) );

    new ApiClient().get(uri)
      .then((result) => {
        dispatch(receiveEntries(list, result));
      })
      .catch((error) => {
        console.error(error);
        dispatch( AC.fetchFailure(list, error.message) );
      });
  };
}

export function receiveEntries(list, rowList) {
  return (dispatch) => {
    const {
      entities,
      entries,
    } = normalizeFormsList(rowList);

    dispatch(
      batchActions(
        addEntities(entities),
        AC.initEntries(list, entries),
        AC.fetchSuccess(list),
      )
    );
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

    dispatch( AC.sortEntries(list, sortKey, direction) );
  }
}

function reverseDirection(curDirection) {
  return curDirection == "asc" ?
    "desc" :
    "asc";
}

export function switchList(list) {
  return (dispatch) => {
    if (list == "org") {
      dispatch(fetchOrg());
    } else {
      dispatch(fetchUser());
    }

    dispatch(setDefaultList(list));
  }
}