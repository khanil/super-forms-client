import * as t from './actionTypes';
import ApiClient from '../../../ApiClient';
import { batchActions as batch } from '../../../redux/utils/batch';
import { normalize, execAction } from './utils';
import * as entities from '../entities/actions';
import * as entityList from '../entityLists/actions';
import * as modal from '../modal/actions';
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

export function copy(id, newTitle, list) {
  const uri = `/api/forms/${id}/copy`;
  return (d, getState) => {
    d( execAction(t.COPY, { list, id, newTitle }) );
    const userId = getUser(getState());

    new ApiClient().post(uri, newTitle)
      .then((payload) => {
        const copyId = payload.id;
        const entry = {
          forms: copyId,
          users: userId
        };

        d(
          batch(
            entities.copy("forms", id, copyId, {
              ...payload,
              title: newTitle
            }),
            entityList.addEntries(list, entry)
          )
        );

      })
      .then(() => {
        d(
          modal.showBriefly(
            "Success",
            { text: "Форма успешно скопирована" },
            1000
          )
        )
      })
      .catch(error => {
        console.error(error);
        d( modal.show("ErrorModal", erorr) );
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
    d( execAction(t.FETCH, { uri, list }) );
    d( entityList.fetchRequest(list) );

    new ApiClient().get(uri)
      .then(result => {
        d( add(list, result) );
        d( entityList.fetchSuccess(list) );
      })
      .catch(error => {
        console.error(error);
        d( entityList.fetchFailure(list, error) );
      })
  }
}

export function remove(id) {
  const uri = `/api/forms/${id}/delete`;
  return d => {
    d( execAction(t.REMOVE, { id }) );

    new ApiClient().delete(uri)
      .then(() => {
        d( entities.remove("forms", id) );
      })
      .then(() => {
        d(
          modal.showBriefly(
            "Success",
            { text: "Форма успешно удалена" },
            1000
          )
        );
      })
      .catch(error => {
        console.error(error);
        d( modal.show("ErrorModal", error) );
      })
  }
}

export function send(id, config) {
  const uri = `/api/forms/${id}/send`;
  return d => {
    d( execAction(t.SEND, { id, config }) );

    new ApiClient().post(uri, JSON.stringify(config))
      .then(() => {
        d( makeFormSent(id, config) );
      })
      .then(() => {
        d(
          modal.show("ViewLink", { formId: id })
        );
      })
      .catch(error => {
        console.error(error);
        d( modal.show("ErrorModal", erorr) );
      })
  }
}

function makeFormSent(id, config) {
  const props = Object.assign({}, config, {
    sent: Date.now()
  });

  return entities.update("forms", id, props);
}

export function switchList(list) {
  return d => {
    if (list == "org") {
      d( fetchOrg() );
    } else {
      d( fetchUser() );
    }

    d( setDefaultList(list) );
  }
}