import { NEWSLETTER_UNSUBSCRIBE } from '../constants/ActionTypes';

export function unsubscribeNewsletter(path, data, subrequest) {
  return {
    type: NEWSLETTER_UNSUBSCRIBE,
    subrequest,
    request: {
      op: 'post',
      path: `${path}/@unsubscribe-newsletter`,
      data,
    },
  };
}

export function resetUnsubscribeNewsletter(subrequest) {
  return {
    type: `${NEWSLETTER_UNSUBSCRIBE}_RESET`,
    subrequest,
  };
}
