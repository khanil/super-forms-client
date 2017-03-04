import * as t from './actionTypes';
import * as m from './model';

const initialState = {
	db: {
		entities: {
			forms: {},
			users: {}
		},
		relations: {}
	}
}

export default function(state = initialState, action) {
  switch (action.type) {

    case t.COPY_SUCCESS:
      const info = Object.assign({}, action.payload.info, action.result);
      return Object.assign({}, state, {
        db: m.forms.copy(db, action.payload.origin_id, info, info.user_id)
      });

      // return state.merge({
      //   busy: false,
      //   db: FormsList.copyForm(db, action.origin_id, info, info.user_id)
      // });

    case t.FETCH_SUCCESS:
    	return Object.assign({}, state, {
    		db: m.init(action.result)
    	});
      // return state.merge({
      //   busy: false,
      //   db: FormsList.init(action.result)
      // });

    case t.REMOVE_SUCCESS:
      return Object.assign({}, state, {
        db: m.forms.remove(db, action.payload.form_id)
      });
      // return state.merge({
      //   busy: false,
      //   db: FormsList.removeForm(db, action.form_id)
      // });

    case t.SEND_SUCCESS:
      return Object.assign({}, state, {
        db: m.forms.send(db, action.payload.form_id, action.payload.config)
      });
      // return state.merge({
      //   busy: false,
      //   db: FormsList.sendForm(db, action.form_id, action.config)
      // });

    default:
      return state;
  }
}