import React from 'react';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

import { ControlsOrg, ControlsPersonal } from '../Controls';

Moment.locale('ru');
momentLocalizer(Moment);
const dateFormat = 'DD.MM.YYYY';
const timeFormat = 'HH:mm';

export const author = {
	key: 'author',
	title: 'Автор',
	compareType: 'string',
	// render: (data) => {
	// 	const surname = data.surname;
	// 	const name = data.name[0] + '.';
	// 	const patronymic = data.patronymic ? (data.patronymic[0] + '.') : '';

	// 	return `${surname} ${name} ${patronymic}`;
	// }
};

export const basis = {
	key: 'basis',
	title: 'Основание',
	compareType: 'string',
	render: (data) => data.basis ? data.basis : 'Не задано'
};

export const controlsForOrg = (component) => ({
	key: 'control',
	title: '',
	render: (data) => {
		const showModal = component.props.showModal;
		const redirect = component.redirect;
		const formId = data.id;
		const payload = {
			formId
		};

		return (
			<ControlsOrg
				copyForm={showModal.bind(null, "CopyForm", payload)}
				showResponses={redirect.bind(null, `/forms/${formId}/responses`)}
			/>
		);
	},
	sort: false
});

export const controlsForPerson = (component) => ({
	key: 'control',
	title: '',
	render: (data) => {
		const showModal = component.props.showModal;
		const redirect = component.redirect;
		const formId = data.id;
		const payload = {
			formId
		};

		return (
			<ControlsPersonal
				isFormSent={data.sent !== null}
				editForm={redirect.bind(null, `/forms/${formId}/edit`)}
				showLink={showModal.bind(null, "ViewLink", payload)}
				showResponses={redirect.bind(null, `/forms/${formId}/responses`)}
				removeForm={showModal.bind(null, "RemoveForm", payload)}
				copyForm={showModal.bind(null, "CopyForm", payload)}
				sendForm={showModal.bind(null, "SendForm", payload)}
			/>
		);
	},
	sort: false
});

export const created = {
	key: 'created',
	title: 'Создано',
	compareType: 'datetime',
	render: (data) => (Moment(data.created).format(`${dateFormat} ${timeFormat}`)),
}

export const edited = {
	key: 'edited',
	title: 'Отредактировано',
	compareType: 'datetime',
	render: (data) => (data.edited ? Moment(data.edited).format(`${dateFormat} ${timeFormat}`) : 'Не редактировалось'),
}

export const expires = {
	key: 'expires',
	title: 'Истекает',
	compareType: 'datetime',
	render: (data) => {
		if (!data.sent)
			return 'Не отправлялось';
		if (data.expires) {
			return Moment(data.expires).format(`${dateFormat} ${timeFormat}`);
		} else {
			return 'Не истекает';
		}
	},
}

export const index = {
	key: 'index',
	title: 'ID',
	compareType: 'number',
};

export const responses = {
	key: 'resp_count',
	title: 'Ответы',
	compareType: 'number',
	render: (data) => {
		if (!data.sent)
			return 'Не отправлялось';
		if (!data["resp_count"])
			return 0;
		return data["resp_count"];
	},
}

export const sent = {
	key: 'sent',
	title: 'Отправлено',
	compareType: 'datetime',
	render: (data) => (data.sent ? Moment(data.sent).format(`${dateFormat} ${timeFormat}`) : 'Не отправлялось'),
}

export const title = {
	key: 'title',
	title: 'Название',
	compareType: 'string',
};

// export const type = {
// 	key: 'type',
// 	title: 'Назначение',
// 	render: (value) => (formTypes[value.toUpperCase()].label),
// 	sortFn: (a, b) => {
// 		const [a_label, b_label] = [formTypes[a.toUpperCase()].label, formTypes[b.toUpperCase()].label];
// 		if (a_label < b_label) return 1;
// 		if (a_label > b_label) return -1;
// 	}
// };