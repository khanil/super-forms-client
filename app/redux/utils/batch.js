export function batchingReducer(reducer) {
  return function batchiedReducer(state, action) {
    switch (action.type) {
      case "BATCH_ACTIONS":
        return action.actions.reduce(batchiedReducer, state);
      default:
        return reducer(state, action);
    }
  }
}

export const BATCH_ACTIONS = "BATCH_ACTIONS";

export function batchActions(...actions) {
  return {
    type: BATCH_ACTIONS,
    actions
  }
}