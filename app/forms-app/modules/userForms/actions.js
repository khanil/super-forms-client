import * as t from './actionTypes';
import ApiClient from '../../../ApiClient';
import forms from '../forms';

import { add as receiveForms } from '../entities/forms/actions';
import { add as receiveUsers } from '../entities/users/actions';

export function fetch() {
  return function(dispatch) {
    const uri = `/api/journal`;

    new ApiClient().get(uri)
      .then((result) => {
        const db = forms.model.init(result);
        dispatch(receiveForms(db.entities.forms));
        dispatch(receiveUsers(db.entities.users));
        dispatch(receiveRelations(db.relations));
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