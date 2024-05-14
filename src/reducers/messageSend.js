import { NEWSLETTER_MESSAGE_SEND, NEWSLETTER_MESSAGE_SEND_TOGGLE_MODAL, NEWSLETTER_MESSAGE_SEND_GET_TOKEN } from '../constants/ActionTypes';

const initialState = {
  send: { loading: false, loaded: false, error: null, result: null },
  token: { loading: false, loaded: false, error: null, value: null },
  modalIsOpen: false,
};

export function messageSendReducer(state = initialState, action = {}) {
  switch (action.type) {
    case `${NEWSLETTER_MESSAGE_SEND}_PENDING`:
      return {
        ...state,
        send: { loading: true, loaded: false, error: null },
        modalIsOpen: true,
      };
    case `${NEWSLETTER_MESSAGE_SEND}_SUCCESS`:
      return {
        send: { loading: false, loaded: true, error: null, result: action.result },
        token: { loading: false, loaded: false, error: null, value: null },
        modalIsOpen: false,
      };
    case `${NEWSLETTER_MESSAGE_SEND}_FAIL`:
      return {
        ...state,
        send: { loading: false, loaded: false, error: action.error },
        modalIsOpen: false,
      };
    case `${NEWSLETTER_MESSAGE_SEND}_RESET`:
      return {
        ...initialState,
      };
    case `${NEWSLETTER_MESSAGE_SEND_GET_TOKEN}_PENDING`:
      return {
        ...state,
        token: { loading: true, loaded: false, error: null, value: null },
      };
    case `${NEWSLETTER_MESSAGE_SEND_GET_TOKEN}_SUCCESS`:
      return {
        ...state,
        token: { loading: false, loaded: true, error: null, value: action.result },
      };
    case `${NEWSLETTER_MESSAGE_SEND_GET_TOKEN}_FAIL`:
      return {
        ...state,
        token: { loading: false, loaded: false, error: action.error, value: null },
      };
    case `${NEWSLETTER_MESSAGE_SEND_GET_TOKEN}_RESET`:
      return {
        ...initialState,
      };
    case 'NEWSLETTER_MESSAGE_SEND_TOGGLE_MODAL':
      console.log('ACTION: ', action);
      if (action.isOpen === false) {
        return { ...initialState };
      }
      return {
        ...state,
        modalIsOpen: action.isOpen,
      };
    default:
      return state;
  }
}
