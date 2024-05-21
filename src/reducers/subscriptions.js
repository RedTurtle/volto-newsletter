import {
  DELETE_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS,
  RESET_DELETE_SUBSCRIPTIONS,
  DELETE_ALL_SUBSCRIPTIONS_DATA,
} from '../constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  subrequests: {},
};

export const deleteAllSubscriptionsReducer = (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case `${DELETE_ALL_SUBSCRIPTIONS_DATA}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        result: null,
      };
    case `${DELETE_ALL_SUBSCRIPTIONS_DATA}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        result: action.result,
        loading: false,
      };
    case `${DELETE_ALL_SUBSCRIPTIONS_DATA}_FAIL`:
      return {
        ...state,
        error: action.error,
        result: null,
        loaded: true,
        loading: false,
      };

    default:
      return state;
  }
};

export const getSubscriptionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_SUBSCRIPTIONS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        result: null,
      };
    case `${GET_SUBSCRIPTIONS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        result: action.result,
        loading: false,
      };
    case `${GET_SUBSCRIPTIONS}_FAIL`:
      return {
        ...state,
        error: action.error,
        result: null,
        loaded: true,
        loading: false,
      };
    default:
      return state;
  }
};

export const deleteSubscriptionsReducer = (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case `${DELETE_SUBSCRIPTIONS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        result: null,
      };
    case `${DELETE_SUBSCRIPTIONS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        result: action.result,
        loading: false,
      };
    case `${DELETE_SUBSCRIPTIONS}_FAIL`:
      return {
        ...state,
        error: action.error,
        result: null,
        loaded: true,
        loading: false,
      };
    default:
      return state;
  }
};
