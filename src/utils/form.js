export default class Form {
	constructor() {};

	static resetCreateDate(form) {
		return Object.assign({}, form, {
			created: Date.now()
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

	static duplicate(origin, info) {
		let copy = Form.toUnsent(origin);
		copy = Form.resetCreateDate(copy);
		return Object.assign({}, copy, info);
	}
}