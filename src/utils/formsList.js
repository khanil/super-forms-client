import { Map, List, fromJS } from 'immutable';
import Form from './form';

export default class FormsList {
	constructor() {}

	static init(list) {
		const database = fromJS({
	    relations: {},
	    entities: {
	      forms: {},
	      users: {}
	    }
	  });

		return database.withMutations(db => {

			list.forEach(form => {
		  	const user_id = form.user_id;
		  	const form_id = form.id;

		  	if (!FormsList.getUser(db, user_id)) {
		  		const user = FormsList.extractUserEntity(form);
		  		db = FormsList.addUser(db, user_id, user);
		  	}

		  	db = FormsList.addForm(db, form_id, form);
		  	db = FormsList.link(db, form_id, user_id);
		  });

		});
	}

	static extractUserEntity(form) {
		return {
			user_id: form['user_id'],
			name: form.name,
			surname: form.surname,
			patronymic: form.patronymic,
			author: form.author
		}
	}

	static addForm(db, id, info) {
		return db.withMutations(mdb => {
			mdb.setIn(['entities', 'forms', id], info);
		});
	}

	static copyForm(db, origin_id, info, user) {
		const user_id = user.id;
		console.log(user);
		const origin = FormsList.getForm(db, origin_id);
		console.log(origin);
		const copy = Form.duplicate(origin, {...user, ...info, user_id});
		console.log(copy);

		return db.withMutations(mdb => {
			mdb = FormsList.addForm(mdb, copy.id, copy);
			mdb = FormsList.link(mdb, copy.id, user_id);
		});
	}

	static getForm(db, id) {
		return db.getIn(['entities', 'forms', id]);
	}

	static getForms(db, filter) {
		if (filter) {
			return FormsList.getFormsByUsername(db, filter);
		}

		return FormsList.getFormsAll(db);
	}

	static getFormsAll(db) {
		return db.getIn(['entities', 'forms']).toList().toJS();
	}

	static getFormsByUser(db, user_id) {
		const forms = [];
		const list = db.getIn(['relations', user_id]);
		if (!list)
			return [];

		list.forEach(id => {
			forms.push( FormsList.getForm(db, id) );
		});
		return forms;
	}

	static getFormsByUsername(db, str) {
		let forms = [];
		const usersIds = FormsList.getUsersByName(db, str).keySeq();
		if (usersIds.size === 0)
			return [];

		usersIds.forEach(user_id => {
			forms = forms.concat( FormsList.getFormsByUser(db, user_id) );
		});
		return forms;
	}

	static removeForm(db, id) {
		const user_id = FormsList.getForm(db, id).user_id;

		return db.withMutations(mdb => {
			mdb = FormsList.unlink(mdb, id, user_id);
			mdb = mdb.deleteIn(['entities', 'forms', 'id']);
		});
	}

	static sendForm(db, id, config) {
		return db.updateIn(['entities', 'forms', id], form => {
			return Form.toSent(form, config);
		})
	}

	static addUser(db, id, info) {
		return db.setIn(['entities', 'users', id], info);
	}

	static getUser(db, id) {
		return db.getIn(['entities', 'users', id]);
	}

	static getUsersByName(db, str) {
		const regExp = new RegExp(str, 'i');
		const users = db.getIn(['entities', 'users']);

		if (!users)
			return [];

	  return users.filter((user) => {
	    const { name, surname } = user;
	    return regExp.test(surname + ' ' + name);
	  });
	}

	static link(db, form_id, user_id) {
		if (!db.getIn(['relations', user_id])) {
			return db.setIn(['relations', user_id], new List([form_id]));
		}

		return db.updateIn(['relations', user_id], list => {
			return list.push(form_id);
		});
	}

	static unlink(db, form_id, user_id) {
		return db.updateIn(['relations', user_id], list => {
			const key = list.findKey(id => (id == form_id))
			return list.delete(key);
		});
	}

}