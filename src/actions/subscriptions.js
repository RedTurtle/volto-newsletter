import {
  DELETE_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS,
  RESET_DELETE_SUBSCRIPTIONS,
} from '../constants/ActionTypes';

export function resetDeleteSubscriptions() {
  return { type: RESET_DELETE_SUBSCRIPTIONS };
}

/**
 * GET_SUBSCRIPTIONS action
 * @module actions/getSubscriptionss
 */
export function getSubscriptions(path, data) {
  return {
    type: GET_SUBSCRIPTIONS,
    request: {
      op: 'get',
      path: path + '/@subscriptions',
      params: data,
    },
  };
}

/**
 * DELETE_SUBSCRIPTIONS action
 * @module actions/deleteSubscriptions
 */
export function deleteSubscriptions(path, data) {
  return {
    type: DELETE_SUBSCRIPTIONS,
    request: {
      op: 'del',
      path: path + '/@subscriptions',
      params: data,
    },
  };
}
