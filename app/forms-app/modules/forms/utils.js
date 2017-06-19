export function execAction(type, args) {
  return {
    type,
    ...args
  };
}

export function makeActionCreators(types) {
  let result = {};
  Object.keys(types).forEach(key => {
    const type = types[key];

    result[key.toLowerCase()] = () => ({
      type
    });
  })
  return result;
}

export function normalize(list) {
  let scheme = {
    entities: {
      forms: {},
      users: {}
    },
    entries: []
  };

  list.forEach((rowForm) => {
    const user_id = rowForm.user_id;
    const form_id = rowForm.id;

    if (!scheme.entities.users[user_id]) {
      const user = getUserEntity(rowForm);
      scheme.entities.users[user_id] = user;
    }

    scheme.entities.forms[form_id] = rowForm;

    scheme.entries.push({
      forms: form_id,
      users: user_id
    });
  });

  return scheme;
}

function getUserEntity(form) {
  return {
    user_id: form['user_id'],
    name: form.name,
    surname: form.surname,
    patronymic: form.patronymic,
    author: form.author
  }
}