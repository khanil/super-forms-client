import * as t from './actionTypes';
import ApiClient from '../../../../../ApiClient';
import { batchActions } from '../../../../../redux/utils/batch';
import { hide as hideModal, show as showModal } from '../../../modal/actions';
import { inject as injectInList } from '../../../formsLists/actions';

export function remove(id) {
  const uri = `/api/forms/${id}/delete`;

  return (d) => {
    d( deleteRequest() );

    new ApiClient().delete(uri)
      .then(() => {
        d(
          batchActions(
            deleteSuccess(id),
            hideModal()
          )
        )
      })
      .catch((error) => {
        d( deleteFailure(id, error) );
        console.error(error);
      });
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

export function send(id) {
  const uri = `/api/forms/${id}/send`;

  return (d) => {
    d( sendRequest() );

    new ApiClient().post(uri)
      .then(() => {
        d(
          batchActions(
            sendSuccess(id),
            showModal("ViewLink", { formId: id })
          )
        );
      })
      .catch((error) => {
        d( sendFailure(id, error) );
        console.error(error);
      });
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


export function copy(id, title, userId) {
  const uri = `/api/forms/${id}/copy`;
  const meta = { id, title, userId };

  return (d) => {
    d( copyRequest(meta) );

    new ApiClient().post(uri)
      .then((payload) => {
        d(
          batchActions(
            copySuccess(meta, payload),
            injectInList("personal", payload),
            injectInList("org", payload),
            hideModal()
          )
        );
      })
      .catch((error) => {
        d( copyFailure(meta, error) );
        console.error(error);
      });
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

