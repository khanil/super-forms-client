import { Map, List } from 'immutable';
import { createSelector } from 'reselect';
import createAction from '../../utils/makeActionCreator.js';
import { modalTypes } from '../../constants';
import { sendFMSuccessConfig } from '../../config';

//- Actions
export const SHOW_MODAL = 'modals/mainPage/SHOW_MODAL';
export const HIDE_MODAL = 'modals/mainPage/HIDE_MODAL';
import * as formsList from './formsList';

//- State
const initialState = Map({
  visible: false,
  type: null,
  payload: null
});

//- Reducer
export default function(state = initialState, action) {
  switch(action.type) {
    case SHOW_MODAL:
      return state.merge({
        visible: true,
        type: action.modalType,
        payload: action.payload
      });

    case HIDE_MODAL:
      return initialState;

    case formsList.COPY_SUCCESS:
      return state.merge({
        visible: true,
        type: modalTypes.SUCCESS_MODAL,
        payload: {
          body: 'Форма скопирована.'
        }
      });

    case formsList.REMOVE_SUCCESS:
      return state.merge({
        visible: true,
        type: modalTypes.SUCCESS_MODAL,
        payload: {
          body: 'Форма удалена.'
        }
      });

    case formsList.SEND_SUCCESS:
      const payload = sendFMSuccessConfig(action.form_id);

      return state.merge({
        visible: true,
        type: modalTypes.SUCCESS_MODAL,
        payload
      });

    case formsList.COPY_FAILURE:
    case formsList.REMOVE_FAILURE:
    case formsList.SEND_FAILURE:
      return state.merge({
        visible: true,
        type: modalTypes.ERROR_MODAL,
        payload: {
          body: action.response
        }
      })

    default:
      return state;
  }
}

//- Action Creators
export const show = createAction(SHOW_MODAL, 'modalType', 'payload');
export const hide = createAction(HIDE_MODAL);

//- Selectors
export const getModal = (state) => state;
