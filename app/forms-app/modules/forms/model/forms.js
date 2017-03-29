import * as users from './users';
import * as form from './form';
import * as rel from './relations';
import * as compareFn from '../utils/compareFn';

export function add(db, id, info) {
	return Object.assign({}, db, {
		entities: Object.assign({}, db.entities, {
			forms: Object.assign({}, db.entities.forms, {
				[id]: info
			})
		})
	})
}

export function copy(db, origin_id, info, userId) {
	const user = users.get(db, userId);
	const origin = get(db, origin_id);
	const copy = form.duplicate(origin, {...user, ...info, userId});
	db = add(db, copy.id, copy);
	db = rel.link(db, copy.id, userId);
	return db;
}

export function get(db, id) {
	return db.entities.forms[id];
}

export function getForms(db, sortCfg) {
	const formsList = getAll(db);

	if (!formsList)
		return [];

	if (sortCfg.field) {
		return sort(formsList, sortCfg.field, sortCfg.type);
	}

	return formsList;
}

export function getAll(db) {
	const forms = db.entities.forms;

	return Object.keys(forms).map((key) => forms[key]);
}

export function getFormsByUser(db, user_id) {
	const forms = [];
	const list = db.relations[user_id];

	if (!list)
		return [];

	list.forEach(id => {
		forms.push( get(db, id) );
	});

	return forms;
}

export function getFormsByUsername(db, str) {
	let forms = [];
	const foundUsers = users.getUsersByName(db, str);

	console.log(foundUsers);

	if (foundUsers.length === 0)
		return [];

	foundUsers.forEach(user => {
		forms = forms.concat( getFormsByUser(db, user.user_id) );
	});

	console.log(forms);

	return forms;
}

export function getUserEntity(form) {
	return {
		user_id: form['user_id'],
		name: form.name,
		surname: form.surname,
		patronymic: form.patronymic,
		author: form.author
	}
}

export function remove(db, id) {
	const user_id = get(db, id).user_id;
	db = rel.unlink(db, id, user_id);

	delete db.entities.forms[id];

	return Object.assign({}, db, {
		entities: Object.assign({}, db.entities, {
			forms: Object.assign({}, db.entities.forms)
		})
	})
}

export function send(db, id, config) {
	return Object.assign({}, db, {
		entities: Object.assign({}, db.entities, {
			forms: Object.assign({}, db.entities.forms, {
				[id]: Object.assign({}, form.toSent(db.entities.forms[id], config))
			})
		})
	})
}

export function sort(forms, field, compateType) {
	if (forms.every((form) => form[field] == undefined)) {
		console.warn('You are trying to sort by undefined field');
		return forms;
	}

	let compare = compareFn[compateType];

	forms.sort((a, b) => compare(a[field], b[field]));
	return forms;
}