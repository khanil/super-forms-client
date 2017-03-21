import * as t from './actionTypes';
import * as m from './model';
import { index as defaultSortCol } from './utils/columns';

export const initialState = {
  db: {
    entities: {
      forms: {},
      users: {}
    },
    relations: {}
  },
  sort: {
    field: defaultSortCol.key,
    type: defaultSortCol.compareType,
    dir: "desc"
  }
}

export default function(state = initialState, action) {
  const db = state.db;

  switch (action.type) {

    case t.COPY_SUCCESS:
      const info = Object.assign({}, action.payload.info, action.result);
      return Object.assign({}, state, {
        db: m.forms.copy(db, action.payload.origin_id, info, info.user_id)
      });

    case t.FETCH_SUCCESS:
      return Object.assign({}, state, {
        db: m.init(action.result)
      });

    case t.REMOVE_SUCCESS:
      return Object.assign({}, state, {
        db: m.forms.remove(db, action.payload.form_id)
      });

    case t.SEND_SUCCESS:
      return Object.assign({}, state, {
        db: m.forms.send(db, action.payload.form_id, action.payload.config)
      });

    case t.SORT:
      return Object.assign({}, state, {
        sort: Object.assign({}, state.sort, {
          dir: state.sort.dir == 'asc' ? 'desc' : 'asc',
          field: action.payload.field,
          type: action.payload.dataType,
        })
      })

    default:
      return state;
  }
}