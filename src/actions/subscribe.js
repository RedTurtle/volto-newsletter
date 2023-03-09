import { NEWSLETTER_SUBSCRIBE } from '../constants/ActionTypes';

export function subscribeNewsletter(path, data, subrequest) {
  return {
    type: NEWSLETTER_SUBSCRIBE,
    subrequest,
    request: {
      op: 'post',
      path: `${path}/@subscribe-newsletter`,
      data,
    },
  };
}

export function resetSubscribeNewsletter(subrequest) {
  return {
    type: `${NEWSLETTER_SUBSCRIBE}_RESET`,
    subrequest,
  };
}
