import { NEWSLETTER_MESSAGE_SEND, NEWSLETTER_MESSAGE_SEND_TOGGLE_MODAL } from '../constants/ActionTypes';

export function messageSend(path) {
  return {
    type: NEWSLETTER_MESSAGE_SEND,
    request: {
      op: 'get',
      path: `${path}/@message-send`,
    },
  };
}

export function messageSendToggleModal(isOpen) {
  return {
    type: NEWSLETTER_MESSAGE_SEND_TOGGLE_MODAL,
    isOpen,
  };
}
