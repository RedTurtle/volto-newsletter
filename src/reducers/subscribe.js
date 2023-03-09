import { NEWSLETTER_SUBSCRIBE } from '../constants/ActionTypes';

const initialSubrequestState = {
  loading: false,
  loaded: false,
  error: null,
  result: null,
};

const initialState = {
  ...initialSubrequestState,
  subrequests: {},
};

export function subscribeNewsletterReducer(state = initialState, action = {}) {
  switch (action.type) {
    case `${NEWSLETTER_SUBSCRIBE}_PENDING`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                ...(state.subrequests[action.subrequest] ||
                  initialSubrequestState),
                loading: true,
                loaded: false,
                error: null,
              },
            },
          }
        : {
            ...state,
            loading: true,
            loaded: false,
            error: null,
          };
    case `${NEWSLETTER_SUBSCRIBE}_SUCCESS`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                ...(state.subrequests[action.subrequest] ||
                  initialSubrequestState),
                loading: false,
                loaded: true,
                error: null,
                result: action.result,
              },
            },
          }
        : {
            ...state,
            loading: false,
            loaded: true,
            error: null,
            result: action.result,
          };
    case `${NEWSLETTER_SUBSCRIBE}_FAIL`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                ...(state.subrequests[action.subrequest] ||
                  initialSubrequestState),
                loading: false,
                loaded: false,
                error: action.error,
              },
            },
          }
        : {
            ...state,
            loading: false,
            loaded: false,
            error: action.error,
          };
    case `${NEWSLETTER_SUBSCRIBE}_RESET`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                ...initialSubrequestState,
              },
            },
          }
        : {
            ...initialState,
            subrequests: {
              ...state.subrequests,
            },
          };
    default:
      return state;
  }
}
