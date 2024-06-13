import { NEWSLETTER_EXPORT_SUBSCRIPTIONS } from '../constants/ActionTypes';

export function exportSubscriptions(path, channel) {
  return {
    type: NEWSLETTER_EXPORT_SUBSCRIPTIONS,
    channel,
    request: {
      op: 'get',
      path: `${path}/@export-subscriptions`,
    },
  };
}
