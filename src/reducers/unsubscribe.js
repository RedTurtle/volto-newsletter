import { NEWSLETTER_UNSUBSCRIBE } from '../constants/ActionTypes';

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

export function unsubscribeNewsletterReducer(
  state = initialState,
  action = {},
) {
  switch (action.type) {
    case `${NEWSLETTER_UNSUBSCRIBE}_PENDING`:
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
    case `${NEWSLETTER_UNSUBSCRIBE}_SUCCESS`:
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
    case `${NEWSLETTER_UNSUBSCRIBE}_FAIL`:
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
    case `${NEWSLETTER_UNSUBSCRIBE}_RESET`:
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
