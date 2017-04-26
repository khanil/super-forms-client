import * as users from './users';
import * as forms from './forms';
import * as rel from './relations';

export * as forms from './forms';

export function init(list) {
	let db = {
    entities: {
      forms: {},
      users: {}
    },
    relations: {
      all: [],
    }
  };

  list.forEach(form => {
  	const user_id = form.user_id;
  	const form_id = form.id;

  	if (!users.get(db, user_id)) {
  		let user = forms.getUserEntity(form);
  		db = users.add(db, user_id, user);
  	}

  	db = forms.add(db, form_id, form);
  	db = rel.link(db, form_id, user_id);

    db.relations.all.push(form_id);
  });

  db.entries = Object.assign([], db.relations.all);
  return db;
}

