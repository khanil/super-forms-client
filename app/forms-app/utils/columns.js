import React from 'react';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

import { formTypes } from '../../../constants';

Moment.locale('ru');
momentLocalizer(Moment);
const dateFormat = 'DD.MM.YYYY';
const timeFormat = 'HH:mm';

function formatDate(date) {
	return Moment(date).format(`${dateFormat} ${timeFormat}`);
}

export const author = {
	key: 'users.author',
	title: 'Автор',
};

export const basis = {
	key: 'forms.basis',
	title: 'Основание',
	render: (data) => data.forms.basis ? data.forms.basis : 'Не задано'
};

export const created = {
	key: 'forms.created',
	title: 'Создано',
	render: data => formatDate(data.forms.created),
}

export const edited = {
	key: 'forms.edited',
	title: 'Отредактировано',
	render: data => data.forms.edited ? formatDate(data.forms.edited) : '-',
}

export const expires = {
	key: 'forms.expires',
	title: 'Истекает',
	render: (data) => {
		if (!data.forms.sent)
			return '-';
		if (data.forms.expires) {
			return formatDate(data.forms.expires);
		} else {
			return 'Бессрочно';
		}
	},
}

export const index = {
	key: 'forms.index',
	title: 'ID',
};

export const responses = {
	key: 'forms.resp_count',
	title: 'Ответы',
	render: (data) => {
		if (!data.forms.sent)
			return '-';
		if (!data.forms["resp_count"])
			return 0;
		return data.forms["resp_count"];
	},
}

export const sent = {
	key: 'forms.sent',
	title: 'Отправлено',
	render: data => data.forms.sent ? formatDate(data.forms.sent) : '-',
}

export const title = {
	key: 'forms.title',
	title: 'Название',
};

export const type = {
	key: 'forms.type',
	title: 'Назначение',
	render: (data) => (formTypes[data.forms.type.toUpperCase()]),
};