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
	key: 'user.author',
	title: 'Автор',
};

export const basis = {
	key: 'basis',
	title: 'Основание',
	render: (data) => data.basis ? data.basis : 'Не задано'
};

export const created = {
	key: 'created',
	title: 'Создано',
	render: data => formatDate(data.created),
}

export const edited = {
	key: 'edited',
	title: 'Отредактировано',
	render: data => data.edited ? formatDate(data.edited) : '-',
}

export const expires = {
	key: 'expires',
	title: 'Истекает',
	render: (data) => {
		if (!data.sent)
			return '-';
		if (data.expires) {
			return formatDate(data.expires);
		} else {
			return 'Бессрочно';
		}
	},
}

export const index = {
	key: 'index',
	title: 'ID',
};

export const responses = {
	key: 'resp_count',
	title: 'Ответы',
	render: (data) => {
		if (!data.sent)
			return '-';
		if (!data["resp_count"])
			return 0;
		return data["resp_count"];
	},
}

export const sent = {
	key: 'sent',
	title: 'Отправлено',
	render: data => data.sent ? formatDate(data.sent) : '-',
}

export const title = {
	key: 'title',
	title: 'Название',
};

export const type = {
	key: 'type',
	title: 'Назначение',
	render: (data) => (formTypes[data.type.toUpperCase()]),
};