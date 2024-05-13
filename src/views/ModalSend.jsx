import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, notify } from 'design-react-kit';
import { useLocation } from 'react-router-dom';
import { messageSend, messageSendToggleModal } from '../actions';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';

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
    defaultMessage: 'You are about to send this message to {subscribers} subscribers.',
  },
  modal_button_cancel: {
    id: 'newsletter_modal_send_button_cancel',
    defaultMessage: 'Cancel',
  },
  modal_button_confirm: {
    id: 'newsletter_modal_send_button_confirm',
    defaultMessage: 'Confirm',
  },
  message_send_error: {
    id: 'newsletter_modal_send_error',
    defaultMessage: 'Error sending the message',
  },
  message_send_success: {
    id: 'newsletter_modal_send_success',
    defaultMessage: "Message succesfully sent. Check channel's history to see his status.",
  },
});

const ModalSend = ({ content }) => {
  const intl = useIntl();
  const location = useLocation();
  const dispatch = useDispatch();

  const path = location.pathname;
  const messageSendStatus = useSelector((state) => state.messageSend);
  const { modalIsOpen } = messageSendStatus;

  const { active_subscriptions } = content?.['@components']?.['message-actions'] || {};

  useEffect(() => {
    if (messageSendStatus.error) {
      /* SEND FAIL */
      toastNotification(intl.formatMessage(messages.message_send_error), 'error');
    }
    if (messageSendStatus.loaded) {
      /* CHANGE SUCCESS */
      toastNotification(intl.formatMessage(messages.message_send_success), 'success');
    }
  }, [messageSendStatus]);

  /* notify toast */
  const toastNotification = (message, color) => {
    notify(message, {
      state: color,
      fix: 'bottom',
    });
  };

  /* function to change booking state */
  const sendMessage = () => {
    dispatch(messageSend(path));
  };

  return (
    <Modal id="modal-send" isOpen={modalIsOpen} centered toggle={() => dispatch(messageSendToggleModal(!modalIsOpen))}>
      <ModalHeader toggle={() => dispatch(messageSendToggleModal(!modalIsOpen))} tag="div">
        <h3 className="mt-2">{intl.formatMessage(messages.modal_title)}</h3>
      </ModalHeader>
      <ModalBody className="mb-4 mb-lg-4">
        <p className="fs-5 fw-semibold mb-3">{intl.formatMessage(messages.modal_description)}</p>
        <p className="fs-6">{intl.formatMessage(messages.modal_text, { subscribers: active_subscriptions })}</p>
      </ModalBody>
      <ModalFooter>
        <Button outline color="primary" onClick={() => dispatch(messageSendToggleModal(!modalIsOpen))}>
          {intl.formatMessage(messages.modal_button_cancel)}
        </Button>
        <Button
          color="primary"
          onClick={() => {
            sendMessage();
          }}
        >
          {messageSendStatus?.loading ? <Icon icon="it-refresh" className="icon-sm load-status-icon" color="white" /> : intl.formatMessage(messages.modal_button_confirm)}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalSend;
