import * as t from './actionTypes';
import ApiClient from '../../../ApiClient';
import { batchActions as batch } from '../../../redux/utils/batch';
import { normalize, execAction } from './utils';
import * as entities from '../entities/actions';
import * as entityList from '../entityLists/actions';
import { setDefaultList } from '../session/actions';
import { getUser } from '../session/selectors';

export function add(list, rowList) {
  return d => {
    const formList = normalize(rowList);

    d(
      batch(
        entities.add("forms", formList.entities.forms),
        entities.add("users", formList.entities.users),
        entityList.initEntries(list, formList.entries),
      )
    );
  }
}

export function copy(list, id, newTitle) {
  const uri = `/api/forms/${id}/copy`;
  return (d, getState) => {
    d(execAction(t.COPY, { list, id, newTitle }));
    const userId = getUser(getState());

    new ApiClient().post(uri, newTitle)
      .then(copyId => {
        const entry = {
          forms: copyId,
          users: userId
        };

        d(
          batch(
            entities.copy("forms", id, copyId),
            entityList.addEntries(list, entry)
          )
        );

      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function fetchOrg() {
  const uri = `/api/journal`;
  return fetch(uri, "org");
}

export function fetchUser() {
  const uri = `/api/forms`;
  return fetch(uri, "personal");
}

export function fetch(uri, list) {
  return d => {
    d(actions.fetch());
    d(entityList.fetchRequest(list));

    new ApiClient().get(uri)
      .then(result => {
        d(add(list, result));
        d(entityList.fetchSuccess(list));
      })
      .catch(error => {
        console.error(error);
        d(entityList.fetchFailure(list, error));
      })
  }
}

export function switchList(list) {
  return d => {
    if (list == "org") {
      d(fetchOrg());
    } else {
      d(fetchUser());
    }

    d(setDefaultList(list));
  }
}