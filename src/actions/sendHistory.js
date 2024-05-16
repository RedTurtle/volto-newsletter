import { DELETE_SEND_HISTORY, GET_SEND_HISTORY, RESET_DELETE_SEND_HISTORY, DELETE_ALL_SEND_HISTORY_DATA } from '../constants/ActionTypes';

export function resetDeleteSendHistory() {
  return { type: RESET_DELETE_SEND_HISTORY };
}

/**
 * GET_SEND_HISTORYS action
 * @module actions/getSendHistorys
 */
export function getSendHistory(path, data) {
  return {
    type: GET_SEND_HISTORY,
    request: {
      op: 'get',
      path: path + '/@send-history',
      params: data,
    },
  };
}

/**
 * DELETE_SEND_HISTORY action
 * @module actions/deleteSendHistory
 */
export function deleteSendHistory(path, data) {
  return {
    type: DELETE_SEND_HISTORY,
    request: {
      op: 'del',
      path: path + '/@send-history',
      params: data,
    },
  };
}

/**
 * DELETE_ALL_SEND_HISTORY_DATA action
 * @module actions/deleteAllSendHistory
 */

export function deleteAllSendHistory(path) {
  return {
    type: DELETE_ALL_SEND_HISTORY_DATA,
    request: {
      op: 'del',
      path: path + '/@send-history',
      params: { uids: 'all' },
    },
  };
}
