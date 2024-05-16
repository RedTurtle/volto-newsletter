import { NEWSLETTER_IMPORT_SUBSCRIPTIONS } from '../constants/ActionTypes';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  result: null,
};

export function importSubscriptionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case `${NEWSLETTER_IMPORT_SUBSCRIPTIONS}_PENDING`:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case `${NEWSLETTER_IMPORT_SUBSCRIPTIONS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        result: action.result,
      };
    case `${NEWSLETTER_IMPORT_SUBSCRIPTIONS}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case `${NEWSLETTER_IMPORT_SUBSCRIPTIONS}_RESET`:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
