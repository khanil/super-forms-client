import * as t from './actionTypes';

export function fetch(formId) {
	const uri = `/api/forms/${formId}/responses`;
	return {
		types: [t.FETCH, t.FETCH_SUCCESS, t.FETCH_FAILURE],
		promise: (client) => client.get(uri),
		payload: {
			formId
		}
	}
}

export function fetchXLSX(formId) {
	const uri = `/api/forms/${formId}/responses/xlsx`;
	return {
		types: [t.FETCH_XLSX, t.FETCH_XLSX_SUCCESS, t.FETCH_XLSX_FAILURE],
		promise: (client) => client.get(uri).then(
			() => { document.location.pathname = uri }
		),
		payload: {
			formId
		}
	}
}

export function subscribeForUpdates(formId, curFormsAmount) {
	return dispatch => {
		dispatch(subscribe(dispatch, formId, curFormsAmount));
	}
}

function subscribe(dispatch, formId, curFormsAmount) {
	const uri = `/api/forms/${formId}/updateResponses/${curFormsAmount}`;
	return {
		types: [t.SUBSCRIBE_FOR_UPDATES, t.SUBSCRIBE_RECEIVE, t.SUBSCRIBE_FAILURE],
		promise: (client) => client.get(uri)
			.then(result => {
				setTimeout(() => dispatch(subscribeForUpdates(formId, curFormsAmount + result.length)), 1000);
				return result;
			})
			.catch(error => {
				setTimeout(() => dispatch(subscribeForUpdates(formId, curFormsAmount)), 1000);
				throw(error);
			})
	}
}