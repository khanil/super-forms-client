import * as t from './actionTypes';
import ApiClient from '../../../ApiClient';
import { batchActions } from '../../../redux/utils/batch';
import forms from '../forms';
import { add as addEntities } from '../entities/actions';

export function fetch() {
  return function(dispatch) {
    const uri = `/api/journal`;
    dispatch(fetchRequest());

    new ApiClient().get(uri)
      .then((result) => {
        const db = forms.model.init(result);

        dispatch(
          batchActions(
            addEntities(db.entities),
            addRelations(db.relations),
            fetchSuccess(),
          )
        );
      })
      .catch((error) => {
        dispatch(fetchFailure(error));
      });
  }
}

function fetchRequest() {
  return {
    type: t.FETCH_REQUEST
  }
}

function fetchSuccess() {
  return {
    type: t.FETCH_SUCCESS
  }
}

function fetchFailure(error) {
  return {
    type: t.FETCH_FAILURE,
    error
  }
}

function addRelations(relations) {
  return {
    type: t.ADD,
    payload: {
      relations
    }
  }
}