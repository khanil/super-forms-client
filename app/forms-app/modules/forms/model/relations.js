export function link(db, form_id, user_id) {
	if (!db.relations[user_id]) {
		return Object.assign({}, db, {
			relations: Object.assign({}, db.relations, {
				[user_id]: [form_id]
			})
		})
	}

	return Object.assign({}, db, {
		relations: Object.assign({}, db.relations, {
			[user_id]: [
				...db.relations[user_id],
				form_id
			]
		})
	})
}

export function unlink(db, form_id, user_id) {
	const forms = db.relations[user_id];
	let entry = 0;
	while (forms[entry] != form_id && entry < forms.length)
		entry++;
	
	if (forms[entry] != form_id) {
		return db;
	}

	return Object.assign({}, db, {
		relations: Object.assign({}, db.relations, {
			[user_id]: [
				...forms.slice(0, entry),
        ...forms.slice(entry + 1)
			]
		})
	})
}