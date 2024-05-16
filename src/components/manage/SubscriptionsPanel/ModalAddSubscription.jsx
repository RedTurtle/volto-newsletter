import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { Button, Dialog, Heading, Input, Label, Modal, TextField } from 'react-aria-components';

import '@plone/components/src/styles/basic/Form.css';
import '@plone/components/src/styles/basic/Button.css';
import '@plone/components/src/styles/basic/Modal.css';
import '@plone/components/src/styles/basic/Dialog.css';
import '../modals.css';

const messages = defineMessages({
  modal_title: {
    id: 'modal_add_subscription',
    defaultMessage: 'Add subscription',
  },
  modal_description: {
    id: 'modal_add_subscription_description',
    defaultMessage: 'Manually add a subscription to this newsletter.',
  },
  email_label: {
    id: 'modal_add_subscription_email_label',
    defaultMessage: 'Email',
  },
  modal_button_cancel: {
    id: 'button_cancel',
    defaultMessage: 'Cancel',
  },
  modal_button_confirm: {
    id: 'button_confirm',
    defaultMessage: 'Confirm',
  },
  message_send_error: {
    id: 'modal_add_subscription_error',
    defaultMessage: 'Error adding subscription.',
  },
  message_send_success: {
    id: 'modal_add_subscription_success',
    defaultMessage: 'Subscriber added.',
  },
});

const ModalAddSubsription = ({ modalIsOpen, toggleModal, onSubmit }) => {
  const intl = useIntl();

  const addSubscriptionStatus = useSelector((state) => state.addSubscription);
  const [emailAddress, setEmailAddress] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email: emailAddress });
    setEmailAddress('');
  };
  return (
    <Modal id="modal-add-subscription" isDismissable isOpen={modalIsOpen} onOpenChange={() => toggleModal(!modalIsOpen)}>
      <Dialog>
        <div className="modal-header">
          <Heading>{intl.formatMessage(messages.modal_title)}</Heading>
          <div className="close">
            <Button onPress={() => toggleModal(!modalIsOpen)}>X</Button>
          </div>
        </div>
        <p className="modal-description">{intl.formatMessage(messages.modal_description)}</p>
        <form onSubmit={onFormSubmit}>
          <div className="field">
            <TextField required id="email" autoFocus value={emailAddress} onChange={setEmailAddress}>
              <Label>{intl.formatMessage(messages.email_label)}</Label>
              <Input />
            </TextField>
          </div>
          <div className="form-action">
            <Button type="submit" className="react-aria-Button primary">
              {addSubscriptionStatus?.loading && <Icon icon="it-refresh" className="icon-sm load-status-icon" color="white" />} {intl.formatMessage(messages.modal_button_confirm)}
            </Button>
            <Button className="react-aria-Button cancel" onClick={() => toggleModal(!modalIsOpen)}>
              {intl.formatMessage(messages.modal_button_cancel)}
            </Button>
          </div>
        </form>
      </Dialog>
    </Modal>
  );
};

export default ModalAddSubsription;
