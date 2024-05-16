import { NEWSLETTER_ADD_SUBSCRIPTION } from '../constants/ActionTypes';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  result: null,
};

export function addSubscriptionReducer(state = initialState, action = {}) {
  switch (action.type) {
    case `${NEWSLETTER_ADD_SUBSCRIPTION}_PENDING`:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case `${NEWSLETTER_ADD_SUBSCRIPTION}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        result: action.result,
      };
    case `${NEWSLETTER_ADD_SUBSCRIPTION}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case `${NEWSLETTER_ADD_SUBSCRIPTION}_RESET`:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
