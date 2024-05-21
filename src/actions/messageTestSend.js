import {
  NEWSLETTER_MESSAGE_TEST_SEND,
  NEWSLETTER_MESSAGE_TEST_SEND_TOGGLE_MODAL,
} from '../constants/ActionTypes';

export function messageTestSend(path, data) {
  return {
    type: NEWSLETTER_MESSAGE_TEST_SEND,
    request: {
      op: 'post',
      path: `${path}/@test-send`,
      data,
    },
  };
}

export function messageTestSendToggleModal(isOpen) {
  return {
    type: NEWSLETTER_MESSAGE_TEST_SEND_TOGGLE_MODAL,
    isOpen,
  };
}
