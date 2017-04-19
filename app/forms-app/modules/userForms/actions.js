import * as t from './actionTypes';
import ApiClient from '../../../ApiClient';
import { batchActions } from '../../../redux/utils/batch';
import forms from '../forms';
import { add as addEntities } from '../entities/actions';

export function fetch() {
  return function(dispatch) {
    const uri = `/api/journal`;

    new ApiClient().get(uri)
      .then((result) => {
        const db = forms.model.init(result);

        dispatch(
          batchActions(
            addEntities(db.entities),
            receiveRelations(db.relations),
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export function receiveRelations(relations) {
  return {
    type: t.ADD,
    payload: {
      relations
    }
  }
}