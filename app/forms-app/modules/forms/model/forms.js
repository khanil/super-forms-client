import * as users from './users';
import * as form from './form';
import * as rel from './relations';

export function add(db, id, info) {
	return Object.assign({}, db, {
		entities: Object.assign({}, db.entities, {
			forms: Object.assign({}, db.entities.forms, {
				[id]: info
			})
		})
	})
}

export function copy(db, origin_id, info, user) {
	const user_id = user.id;
	const origin = get(db, origin_id);
	const copy = form.duplicate(origin, {...user, ...info, user_id});
	db = add(db, copy.id, copy);
	db = rel.link(db, copy.id, user_id);
	return db;
}

export function get(db, id) {
	return db.entities.forms[id];
}

export function getForms(db, filter) {
	if (filter) {
		return getFormsByUsername(db, filter);
	}

	return getAll(db);
}

export function getAll(db) {
	const forms = db.entities.forms;
	return Object.keys(forms).map((key) => forms[key]);
}

export function getFormsByUser(db, user_id) {
	const forms = [];
	const list = db.relations.user_id;
	if (!list)
		return [];

	list.forEach(id => {
		forms.push( get(db, id) );
	});
	return forms;
}

export function getFormsByUsername(db, str) {
	let forms = [];
	const usersIds = users.getUsersByName(db, str).map(id => id);
	if (usersIds.size === 0)
		return [];

	usersIds.forEach(user_id => {
		forms = forms.concat( getFormsByUser(db, user_id) );
	});
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

	return Object.assign({}, db, {
		entities: Object.assign({}, db.entities, {
			forms: Object.assign({}, db.entities.forms, {
				id: undefined
			})
		})
	})
}

export function send(db, id, config) {
	return Object.assign({}, db, {
		entities: Object.assign({}, db.entities, {
			forms: Object.assign({}, db.entities.forms, {
				id: Object.assign({}, form.toSent(db.entities.forms[id], config))
			})
		})
	})
}