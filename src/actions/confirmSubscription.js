import { NEWSLETTER_CONFIRM_SUBSCRIPTION } from '../constants/ActionTypes';

export function confirmNewsletterSubscription(path, data, subrequest) {
  return {
    type: NEWSLETTER_CONFIRM_SUBSCRIPTION,
    subrequest,
    request: {
      op: 'post',
      path: `${path}/@confirm-subscription-newsletter`,
      data,
    },
  };
}

export function resetConfirmNewsletterSubscription(subrequest) {
  return {
    type: `${NEWSLETTER_CONFIRM_SUBSCRIPTION}_RESET`,
    subrequest,
  };
}
