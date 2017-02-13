import { formTypes } from '../../constants';
import React from 'react';

import Moment from 'moment';
Moment.locale('ru');
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);

const dateFormat = 'DD.MM.YYYY';
const timeFormat = 'HH:mm';

import ControlButtons from '../../components/ControlButtons';
import ButtonGlyphicon from '../../components/ButtonGlyphicon';

export const author = {
	key: 'author',
  title: 'Автор',
  renderCell: (value, data) => {
    const surname = data.surname;
    const name = data.name[0] + '.';
    const patronymic = data.patronymic ? (data.patronymic[0] + '.') : '';

    return `${surname} ${name} ${patronymic}`;
  }
};

export const basis = {
  key: 'basis',
  title: 'Основание',
  renderCell: (value, data) => value ? value : 'Не задано'
};

export const controlsForOrg = (component) => ({
  key: 'control',
  title: '',
  renderCell: (value, data) => (
    <div className={`btn-group ${ControlButtons.className}`}>
      <ButtonGlyphicon
        icon='list-alt'
        onClick={component.redirectToResponsesPage.bind(null, data.id)}
        title='Просмотр ответов'
      />
    </div>
  ),
  sort: false
});

export const controlsForPerson = (component) => ({
  key: 'control',
  title: '',
  renderCell: (value, data) => (
    <ControlButtons
      isFormSent={data.sent !== null}
      edit={component.redirectToEditPage.bind(null, data.id)}
      showStatus={component.showStatus.bind(null, data.id, data.title)}
      showResponses={component.redirectToResponsesPage.bind(null, data.id)}
      remove={component.remove.bind(null, data.id)}
      copy={component.copy.bind(null, data.id, data.title)}
      send={component.send.bind(null, data.id)}
    />
  ),
  sort: false
});

export const created = {
  key: 'created',
  title: 'Создано',
  renderCell: (value) => (Moment(value).format(`${dateFormat} ${timeFormat}`)),
  sortFn: (a, b) => {
    const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
    return (values[1] - values[0]);
  }
}

export const edited = {
  key: 'edited',
  title: 'Отредактировано',
  renderCell: (value) => (value ? Moment(value).format(`${dateFormat} ${timeFormat}`) : 'Не редактировалось'),
  sortFn: (a, b) => {
    const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
    return (values[1] - values[0]);
  }
}

export const expires = {
  key: 'expires',
  title: 'Истекает',
  renderCell: (value, data) => {
    if (!data.sent)
      return 'Не отправлялось';
    if (value) {
      return Moment(value).format(`${dateFormat} ${timeFormat}`);
    } else {
      return 'Не истекает';
    }
  },
  sortFn: (a, b) => {
    const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
    return (values[1] - values[0]);
  }
}

export const index = {
	key: 'index',
  title: 'ID',
  sortFn: (a, b) => (b - a)
};

export const responses = {
  key: 'resp_count',
  title: 'Ответы',
  renderCell: (value, data) => {
    if (!data.sent)
      return 'Не отправлялось';
    if (value === null)
      return 0;
    return value;
  },
  sortFn: (a, b) => (b - a)
}

export const sent = {
  key: 'sent',
  title: 'Отправлено',
  renderCell: (value) => (value ? Moment(value).format(`${dateFormat} ${timeFormat}`) : 'Не отправлялось'),
  sortFn: (a, b) => {
    const values = [a, b].map((v) => v ? Moment(v).valueOf() : null);
    return (values[1] - values[0]);
  }
}

export const title = {
	key: 'title',
  title: 'Название'
};

export const type = {
	key: 'type',
  title: 'Назначение',
  renderCell: (value) => (formTypes[value.toUpperCase()].label),
  sortFn: (a, b) => {
    const [a_label, b_label] = [formTypes[a.toUpperCase()].label, formTypes[b.toUpperCase()].label];
    if (a_label < b_label) return 1;
    if (a_label > b_label) return -1;
  }
};