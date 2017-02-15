import { Map, List, fromJS } from 'immutable';
import Form from './form';

export default class FormsList {
	constructor() {}

	static init(list) {
		const database = fromJS({
			list: [],
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

	static getUser(db, id) {
		return db.getIn(['entities', 'users', id]);
	}

	static addUser(db, id, info) {
		return db.setIn(['entities', 'users', id], info);
	}

	static getForm(db, id) {
		return db.getIn(['entities', 'forms', id]);
	}

	static addForm(db, id, info) {
		return db.withMutations(mdb => {
			mdb.update('list', list => list.push(id));
			mdb.setIn(['entities', 'forms', id], info);
		});
	}

	static copyForm(db, origin_id, info, user_id) {
		const origin = FormsList.getForm(db, origin_id);
		const copy = Form.duplicate(origin, {...FormsList.getUser(db, user_id), ...info});

		return db.withMutations(mdb => {
			mdb = FormsList.addForm(mdb, copy.id, copy);
			mdb = FormsList.link(mdb, copy.id, user_id);
		});
	}

	static getForms(db) {
		const list = [];
		db.get('list').forEach(id => {
			list.push( FormsList.getForm(db, id) );
		});
		return list;
	}

	static link(db, form_id, user_id) {
		if (!db.getIn(['relations', user_id])) {
			return db.setIn(['relations', user_id], new Array(form_id));
		}

		return db.updateIn(['relations', user_id], list => {
			list.push(form_id);
			return list;
		});
	}

}