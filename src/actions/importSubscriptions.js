import { NEWSLETTER_IMPORT_SUBSCRIPTIONS } from '../constants/ActionTypes';

export function importSubscriptions(path, data) {
  return {
    type: NEWSLETTER_IMPORT_SUBSCRIPTIONS,
    request: {
      op: 'post',
      path: `${path}/@import-subscriptions`,
      data,
    },
  };
}
