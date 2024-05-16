import { NEWSLETTER_ADD_SUBSCRIPTION } from '../constants/ActionTypes';

export function addSubscription(path, data) {
  return {
    type: NEWSLETTER_ADD_SUBSCRIPTION,
    request: {
      op: 'post',
      path: `${path}/@subscriptions`,
      data,
    },
  };
}
