export function add(db, id, info) {
	return Object.assign({}, db, {
		entities: Object.assign({}, db.entities, {
			users: Object.assign({}, db.entities.users, {
				[id]: info
			})
		})
	})
}

export function get(db, id) {
	return db.entities.users[id];
}

export function getUsersByName(db, str) {
	const regExp = new RegExp(str, 'i');
	const users = db.entities.users;

	if (!users)
		return [];

  let result = [];

  for (let key in users) {
    let user = users[key];
    const { name, surname } = user;
    if (regExp.test(surname + ' ' + name)) {
      result.push(user);
    }
  }

  return result;
}