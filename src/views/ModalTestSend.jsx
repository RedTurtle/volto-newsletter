import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, notify } from 'design-react-kit';
import { useLocation } from 'react-router-dom';
import { messageTestSend, messageTestSendToggleModal } from '../actions';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';

const messages = defineMessages({
  modal_title: {
    id: 'modal_test_send_title',
    defaultMessage: 'Test sending',
  },
  modal_description: {
    id: 'modal_test_send_description',
    defaultMessage: 'Try to send this message to an email address before actual send.',
  },
  email_label: {
    id: 'newsletter_modal_test_send_email_label',
    defaultMessage: 'Email',
  },
  modal_button_cancel: {
    id: 'newsletter_modal_test_send_button_cancel',
    defaultMessage: 'Cancel',
  },
  modal_button_confirm: {
    id: 'newsletter_modal_test_send_button_confirm',
    defaultMessage: 'Confirm',
  },
  message_send_error: {
    id: 'newsletter_modal_test_send_error',
    defaultMessage: 'Error sending test message.',
  },
  message_send_success: {
    id: 'newsletter_modal_test_send_success',
    defaultMessage: 'Test message sent',
  },
});

const ModalTestSend = () => {
  const intl = useIntl();
  const location = useLocation();
  const dispatch = useDispatch();

  const path = location.pathname;

  const [emailAddress, setEmailAddress] = useState('');
  const messageSendStatus = useSelector((state) => state.messageTestSend);

  const { modalIsOpen } = messageSendStatus;

  useEffect(() => {
    if (messageSendStatus.error) {
      /* SEND FAIL */
      setEmailAddress('');
      toastNotification(intl.formatMessage(messages.message_send_error), 'error');
    }
    if (messageSendStatus.loaded) {
      /* CHANGE SUCCESS */
      setEmailAddress('');
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
    dispatch(messageTestSend(path, { email: emailAddress }));
  };

  return (
    <Modal id="modal-test-send" isOpen={modalIsOpen} centered toggle={() => dispatch(messageTestSendToggleModal(!modalIsOpen))}>
      <ModalHeader toggle={() => dispatch(messageTestSendToggleModal(!modalIsOpen))} tag="div">
        <h3 className="mt-2">{intl.formatMessage(messages.modal_title)}</h3>
      </ModalHeader>
      <ModalBody className="mb-4 mb-lg-4">
        <p className="fs-5 fw-semibold mb-3">{intl.formatMessage(messages.modal_description)}</p>
        <div className="mt-5">
          <Input
            type="text"
            id="email"
            className="mb-1"
            required
            label={intl.formatMessage(messages.email_label)}
            value={emailAddress}
            onChange={(e) => {
              setEmailAddress(e.target.value);
            }}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button outline color="primary" onClick={() => dispatch(messageTestSendToggleModal(!modalIsOpen))}>
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

export default ModalTestSend;
