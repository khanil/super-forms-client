import * as t from './actionTypes';

export function changeTab(tab) {
  const uri = `/api/setdefaulttab`;
  return {
    types: [t.TAB_CHANGE, t.TAB_CHANGE_SUCCESS, t.TAB_CHANGE_FAILURE],
    promise: (client) => client.post(uri, tab),
    payload: {
      activeTab: tab
    }
  }
}