import React, { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from 'design-react-kit';
import { useLocation } from 'react-router-dom';
import {
  messageSend,
  messageSendReset,
  messageSendToggleModal,
  messageSendGetToken,
} from '../../actions';
import { Button, Dialog, Heading, Modal } from 'react-aria-components';

import '@plone/components/src/styles/basic/Button.css';
import '@plone/components/src/styles/basic/Modal.css';
import '@plone/components/src/styles/basic/Dialog.css';
import './modals.css';

const messages = defineMessages({
  modal_title: {
    id: 'modal_send_title',
    defaultMessage: 'Send message',
  },
  modal_description: {
    id: 'modal_send_description',
    defaultMessage: 'Send this message to all subscribers.',
  },
  modal_text: {
    id: 'newsletter_modal_send_text',
    defaultMessage:
      'You are about to send this message to {subscribers} subscribers.',
  },
  cancel: {
    id: 'button_cancel',
    defaultMessage: 'Cancel',
  },
  confirm: {
    id: 'button_confirm',
    defaultMessage: 'Confirm',
  },
  message_send_error: {
    id: 'newsletter_modal_send_error',
    defaultMessage: 'Error sending the message',
  },
  message_send_success: {
    id: 'newsletter_modal_send_success',
    defaultMessage:
      "Message succesfully sent. Check channel's history to see his status.",
  },
});

const ModalSend = ({ content }) => {
  const intl = useIntl();
  const location = useLocation();
  const dispatch = useDispatch();

  const path = location.pathname;
  const messageSendStatus = useSelector(
    (state) => state.messageSend?.send || {},
  );
  const messageTokenStatus = useSelector(
    (state) => state.messageSend?.token || {},
  );
  const modalIsOpen = useSelector(
    (state) => state.messageSend?.modalIsOpen || false,
  );

  const { active_subscriptions } =
    content?.['@components']?.['message-actions'] || {};

  /* SEND SUCCESS */
  useEffect(() => {
    if (messageSendStatus.loaded) {
      /* CHANGE SUCCESS */
      toastNotification(
        intl.formatMessage(messages.message_send_success),
        'success',
      );
      return () => {
        dispatch(messageSendReset());
      };
    }
  }, [dispatch, intl, messageSendStatus]);

  /* SEND FAIL */
  useEffect(() => {
    if (messageSendStatus.error) {
      /* SEND FAIL */
      toastNotification(
        intl.formatMessage(messages.message_send_error),
        'error',
      );
      return () => {
        dispatch(messageSendReset());
      };
    }
  }, [dispatch, intl, messageSendStatus]);

  useEffect(() => {
    if (modalIsOpen) {
      if (!messageTokenStatus.loading && !messageTokenStatus.loaded) {
        dispatch(messageSendGetToken(path));
      }
      if (messageSendGetToken.error) {
        /* SEND FAIL */
        toastNotification(messageSendGetToken.error);
      }
    }
  }, [messageTokenStatus, modalIsOpen]);
  /* notify toast */
  const toastNotification = (message, color) => {
    notify(message, {
      state: color,
      fix: 'bottom',
    });
  };

  /* function to change booking state */
  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(messageSend(path, { ...messageTokenStatus.value }));
  };

  return (
    <Modal
      id="modal-send"
      isDismissable
      isOpen={modalIsOpen}
      onOpenChange={() => dispatch(messageSendToggleModal(!modalIsOpen))}
    >
      <Dialog>
        <div className="modal-header">
          <Heading>{intl.formatMessage(messages.modal_title)}</Heading>
          <div className="close">
            <Button
              onPress={() => dispatch(messageSendToggleModal(!modalIsOpen))}
            >
              X
            </Button>
          </div>
        </div>
        <p className="modal-description">
          {intl.formatMessage(messages.modal_description)}
        </p>
        <p>
          {intl.formatMessage(messages.modal_text, {
            subscribers: active_subscriptions,
          })}
        </p>
        <form onSubmit={onFormSubmit}>
          <div className="form-action">
            <Button type="submit" className="react-aria-Button primary">
              {intl.formatMessage(messages.confirm)}
            </Button>
            <Button
              className="react-aria-Button cancel"
              onClick={() => dispatch(messageSendToggleModal(!modalIsOpen))}
            >
              {intl.formatMessage(messages.cancel)}
            </Button>
          </div>
        </form>
      </Dialog>
    </Modal>
  );
};

export default ModalSend;
