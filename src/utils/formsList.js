import { Map, List, fromJS } from 'immutable';

export default class FormsList {
	constructor() {
	  this.db = fromJS({
	    relations: {},
	    entities: {
	      forms: {},
	      users: {}
	    }
	  });
	}

	static convert(list) {
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
			patronymic: form.patronymic
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

	static getForms(db) {
		return db.getIn(['entities', 'forms']).toList();
	}

	static addForm(db, id, info) {
		return db.setIn(['entities', 'forms', id], info);
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