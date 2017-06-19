import { createStore, applyMiddleware, compose } from 'redux';
import customPromiseMiddleware from './middleware/customPromiseMiddleware';
import thunk from 'redux-thunk';
import ApiClient from '../ApiClient';
import { batchingReducer } from './utils/batch';

const client = new ApiClient();

export default function configureStore(rootReducer, initialState) {
  const store = createStore(
    batchingReducer(rootReducer),
    initialState,
    compose(
      applyMiddleware (
        thunk
      )
    )
  );
  return store;
}

export function configureStoreClient(rootReducer, initialState) {
  const store = createStore(
    batchingReducer(rootReducer),
    initialState,
    compose(
      applyMiddleware (
        customPromiseMiddleware(client),
        thunk
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
}