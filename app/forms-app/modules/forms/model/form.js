export function duplicate(origin, info) {
	let copy = toUnsent(origin);
	copy = resetCreateDate(copy);
	return Object.assign({}, copy, info);
}

export function resetCreateDate(form) {
	return Object.assign({}, form, {
		created: Date.now()
	});
}

export function toSent(form, { allowrefill, allowexpire, expires }) {
	return Object.assign({}, form, {
		allowrefill,
		allowexpire,
		expires,
		sent: Date.now()
	});
}

export function toUnsent(form) {
	return Object.assign({}, form, {
		edited: null,
		expires: null,
		resp_count: null,
		sent: null,
		allowrefill: false
	});
}