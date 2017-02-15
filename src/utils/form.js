export default class Form {
	constructor() {};

	static duplicate(origin, info) {
		let copy = Form.toUnsent(origin);
		copy = Form.resetCreateDate(copy);
		return Object.assign({}, copy, info);
	}

	static resetCreateDate(form) {
		return Object.assign({}, form, {
			created: Date.now()
		});
	}

	static toSent(form, { allowrefill, allowexpire, expires }) {
		return Object.assign({}, form, {
			allowrefill,
			allowexpire,
			expires,
			sent: Date.now()
		});
	}

	static toUnsent(form) {
		return Object.assign({}, form, {
			edited: null,
			expires: null,
			resp_count: null,
			sent: null,
			allowrefill: false
		});
	}
}