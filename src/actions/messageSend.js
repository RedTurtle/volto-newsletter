import {
  NEWSLETTER_MESSAGE_SEND_GET_TOKEN,
  NEWSLETTER_MESSAGE_SEND,
  NEWSLETTER_MESSAGE_SEND_RESET,
  NEWSLETTER_MESSAGE_SEND_TOGGLE_MODAL,
} from '../constants/ActionTypes';

export function messageSend(path, data) {
  return {
    type: NEWSLETTER_MESSAGE_SEND,
    request: {
      op: 'post',
      path: `${path}/@message-send`,
      data,
    },
  };
}
export function messageSendGetToken(path) {
  return {
    type: NEWSLETTER_MESSAGE_SEND_GET_TOKEN,
    request: {
      op: 'get',
      path: `${path}/@send-token`,
    },
  };
}
export function messageSendToggleModal(isOpen) {
  return {
    type: NEWSLETTER_MESSAGE_SEND_TOGGLE_MODAL,
    isOpen,
  };
}

export function messageSendReset() {
  return {
    type: NEWSLETTER_MESSAGE_SEND_RESET,
  };
}
