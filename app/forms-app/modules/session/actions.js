import * as t from './actionTypes';

export function setDefaultList(tab) {
  const uri = `/api/setdefaulttab`;
  return {
    types: [
      t.SET_DEFAULT_REQUEST,
      t.SET_DEFAULT_SUCCESS,
      t.SET_DEFAULT_FAILURE
    ],
    promise: (client) => client.post(uri, tab),
    payload: {
      activeTab: tab
    }
  }
}