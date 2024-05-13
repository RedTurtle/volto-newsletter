import { NEWSLETTER_MESSAGE_TEST_SEND, NEWSLETTER_MESSAGE_TEST_SEND_TOGGLE_MODAL } from '../constants/ActionTypes';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  result: null,
  modalIsOpen: false,
};

export function messageTestSendReducer(state = initialState, action = {}) {
  switch (action.type) {
    case `${NEWSLETTER_MESSAGE_TEST_SEND}_PENDING`:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
        modalIsOpen: true,
      };
    case `${NEWSLETTER_MESSAGE_TEST_SEND}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        result: action.result,
        modalIsOpen: false,
      };
    case `${NEWSLETTER_MESSAGE_TEST_SEND}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        modalIsOpen: false,
      };
    case `${NEWSLETTER_MESSAGE_TEST_SEND}_RESET`:
      return {
        ...initialState,
      };
    case 'NEWSLETTER_MESSAGE_TEST_SEND_TOGGLE_MODAL':
      return {
        ...state,
        modalIsOpen: action.isOpen,
      };
    default:
      return state;
  }
}
