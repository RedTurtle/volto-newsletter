import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { Toast } from '@plone/volto/components';
import { useLocation } from 'react-router-dom';
import {
  messageTestSend,
  messageTestSendReset,
  messageTestSendToggleModal,
} from '../../actions';
import {
  Button,
  Dialog,
  Heading,
  Input,
  Label,
  Modal,
  TextField,
} from 'react-aria-components';

import '@plone/components/src/styles/basic/Form.css';
import '@plone/components/src/styles/basic/Button.css';
import '@plone/components/src/styles/basic/Modal.css';
import '@plone/components/src/styles/basic/Dialog.css';
import './modals.css';

const messages = defineMessages({
  modal_title: {
    id: 'modal_test_send_title',
    defaultMessage: 'Test sending',
  },
  modal_description: {
    id: 'modal_test_send_description',
    defaultMessage:
      'Try to send this message to an email address before actual send.',
  },
  email_label: {
    id: 'newsletter_modal_test_send_email_label',
    defaultMessage: 'Email',
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
    id: 'newsletter_modal_test_send_error',
    defaultMessage: 'Error sending test message.',
  },
  message_send_success: {
    id: 'newsletter_modal_test_send_success',
    defaultMessage: 'Test message sent',
  },
  error: {
    id: 'panel_error',
    defaultMessage: 'Error',
  },
  success: {
    id: 'success_label',
    defaultMessage: 'Success',
  },
});

const ModalTestSend = ({ toastify }) => {
  const intl = useIntl();
  const location = useLocation();
  const dispatch = useDispatch();

  const path = location.pathname;

  const [emailAddress, setEmailAddress] = useState('');
  const messageSendStatus = useSelector((state) => state.messageTestSend);

  const { modalIsOpen } = messageSendStatus;

  /* SEND SUCCESS */
  useEffect(() => {
    if (messageSendStatus.loaded) {
      /* CHANGE SUCCESS */
      setEmailAddress('');
      toastNotification({
        message: intl.formatMessage(messages.message_send_success),
        success: true,
      });
      return () => {
        dispatch(messageTestSendReset());
      };
    }
  }, [dispatch, intl, messageSendStatus]);

  /* SEND FAIL */
  useEffect(() => {
    if (messageSendStatus.error) {
      /* SEND FAIL */
      setEmailAddress('');
      toastNotification({
        message:
          messageSendStatus.error?.response?.body.message ||
          intl.formatMessage(messages.message_send_error),
        success: false,
      });
      return () => {
        dispatch(messageTestSendReset());
      };
    }
  }, [dispatch, intl, messageSendStatus]);

  /* notify toast */
  const toastNotification = ({ message, success }) => {
    success === true
      ? toastify.toast.success(
          <Toast
            success
            title={intl.formatMessage(messages.success)}
            content={message}
          />,
        )
      : toastify.toast.error(
          <Toast
            error
            title={intl.formatMessage(messages.error)}
            content={message}
          />,
        );
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(messageTestSend(path, { email: emailAddress }));
    setEmailAddress('');
  };

  return (
    <Modal
      id="modal-test-send"
      className="react-aria-Modal newsletter-modal"
      isDismissable
      isOpen={modalIsOpen}
      onOpenChange={() => dispatch(messageTestSendToggleModal(!modalIsOpen))}
    >
      <Dialog>
        <div className="modal-header">
          <Heading>{intl.formatMessage(messages.modal_title)}</Heading>
          <div className="close">
            <Button
              onPress={() => dispatch(messageTestSendToggleModal(!modalIsOpen))}
            >
              X
            </Button>
          </div>
        </div>
        <p className="modal-description">
          {intl.formatMessage(messages.modal_description)}
        </p>
        <form onSubmit={onFormSubmit}>
          <div className="field">
            <TextField
              required
              id="email"
              autoFocus
              value={emailAddress}
              onChange={setEmailAddress}
            >
              <Label>{intl.formatMessage(messages.email_label)}</Label>
              <Input />
            </TextField>
          </div>
          <div className="form-action">
            <Button type="submit" className="react-aria-Button primary">
              {intl.formatMessage(messages.confirm)}
            </Button>
            <Button
              className="react-aria-Button cancel"
              onClick={() => dispatch(messageTestSendToggleModal(!modalIsOpen))}
            >
              {intl.formatMessage(messages.cancel)}
            </Button>
          </div>
        </form>
      </Dialog>
    </Modal>
  );
};

export default compose(injectLazyLibs(['toastify']))(ModalTestSend);
