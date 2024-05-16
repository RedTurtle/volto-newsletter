import { NEWSLETTER_EXPORT_SUBSCRIPTIONS } from '../constants/ActionTypes';

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  result: null,
};

function download(filename, text) {
  console.log(text);
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/comma-separated-values;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export function exportSubscriptionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case `${NEWSLETTER_EXPORT_SUBSCRIPTIONS}_PENDING`:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case `${NEWSLETTER_EXPORT_SUBSCRIPTIONS}_SUCCESS`:
      download(`export-${action.channel}-subscriptions.csv`, action.result);
    case `${NEWSLETTER_EXPORT_SUBSCRIPTIONS}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case `${NEWSLETTER_EXPORT_SUBSCRIPTIONS}_RESET`:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
