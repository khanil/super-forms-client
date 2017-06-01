import * as t from './actionTypes';
import ApiClient from '../../../../../ApiClient';
import { batchActions } from '../../../../../redux/utils/batch';
import { hide as hideModal, show as showModal } from '../../../modal/actions';
import { inject as injectInList } from '../../../entityLists/actions';
import { inject as injectInModal } from '../../../modal/actions';

export function remove(id) {
  const uri = `/api/forms/${id}/delete`;

  return (d) => {
    d( deleteRequest() );
    d( injectInModal({ busy: true }) );

    new ApiClient().delete(uri)
      .catch((error) => {
        console.log(error);
        d(
          batchActions(
            deleteFailure(id, error),
            showModal("ErrorModal", error)
          )
        );
        throw(error);
      })
      .then(() => {
        d(
          batchActions(
            deleteSuccess(id),
            showModal("Success", {
              text: "Форма успешно удалена"
            })
          )
        )
      })
      .then(() => {
        setTimeout( () => { d(hideModal()) }, 500 );
      })
  }
}

export function deleteRequest(id) {
  return {
    type: t.DELETE_REQUEST,
    meta: {
      id
    }
  }
}

export function deleteSuccess(id) {
  return {
    type: t.DELETE_SUCCESS,
    meta: {
      id
    }
  }
}

export function deleteFailure(id, error) {
  return {
    type: t.DELETE_FAILURE,
    meta: {
      id
    },
    error
  }
}

export function send(id, cfg) {
  const uri = `/api/forms/${id}/send`;

  return (d) => {
    d( sendRequest() );
    d( injectInModal({ busy: true }) );

    new ApiClient().post(uri, JSON.stringify(cfg))
      .catch((error) => {
        d(
          batchActions(
            sendFailure(id, error),
            showModal("ErrorModal", error)
          )
        );
        throw(error);
      })
      .then(() => {
        d(
          batchActions(
            sendSuccess(id),
            showModal("ViewLink", { formId: id })
          )
        );
      })
  }
}


export function sendRequest(id) {
  return {
    type: t.SEND_REQUEST,
    meta: {
      id
    }
  }
}

export function sendSuccess(id) {
  return {
    type: t.SEND_SUCCESS,
    meta: {
      id
    }
  }
}

export function sendFailure(id, error) {
  return {
    type: t.SEND_FAILURE,
    meta: {
      id
    },
    error
  }
}

export function copy(id, title, user_id) {
  const uri = `/api/forms/${id}/copy`;
  const meta = { id, title, user_id };

  return (d) => {
    d( copyRequest(meta) );
    d( injectInModal({ busy: true }) );

    new ApiClient().post(uri, title)
      .catch((error) => {
        d(
          batchActions(
            copyFailure(meta, error),
            showModal("ErrorModal", error)
          )
        );
        throw(error);
      })
      .then((payload) => {
        d(
          batchActions(
            copySuccess(meta, payload),
            injectInList("personal", payload),
            injectInList("org", payload),
            showModal("Success", {
              text: "Форма успешно скопирована"
            })
          )
        );
      })
      .then(() => {
        setTimeout( () => { d(hideModal()) }, 500 );
      })
  }
}


export function copyRequest(meta) {
  return {
    type: t.COPY_REQUEST,
    meta
  }
}

export function copySuccess(meta, payload) {
  return {
    type: t.COPY_SUCCESS,
    meta,
    payload
  }
}

export function copyFailure(meta, error) {
  return {
    type: t.COPY_FAILURE,
    meta,
    error
  }
}

