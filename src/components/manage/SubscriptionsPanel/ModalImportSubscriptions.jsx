import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { DropZone, FileTrigger, Button, Dialog, Heading, Checkbox, Label, Modal, TextField, Text, Input } from 'react-aria-components';
import trashSVG from '@plone/volto/icons/delete.svg';
import { Icon } from '@plone/volto/components';

import '@plone/components/src/styles/basic/Form.css';
import '@plone/components/src/styles/basic/Button.css';
import '@plone/components/src/styles/basic/Modal.css';
import '@plone/components/src/styles/basic/Dialog.css';
import '@plone/components/src/styles/basic/Checkbox.css';

const messages = defineMessages({
  modal_title: {
    id: 'modal_import_subscriptions',
    defaultMessage: 'Import subscriptions',
  },
  modal_description: {
    id: 'modal_import_subscriptions_description',
    defaultMessage: 'Import subscriptions from a csv file.',
  },
  modal_button_cancel: {
    id: 'button_cancel',
    defaultMessage: 'Cancel',
  },
  modal_button_confirm: {
    id: 'button_confirm',
    defaultMessage: 'Confirm',
  },
  file_label: {
    id: 'import_file_label',
    defaultMessage: 'Source file',
  },
  reset_list_label: {
    id: 'import_reset_list_label',
    defaultMessage: 'Reset list',
  },
  reset_list_help: {
    id: 'import_reset_list_help',
    defaultMessage: 'Reset subscriptions before import.',
  },
  remove_from_list_label: {
    id: 'import_remove_from_list_label',
    defaultMessage: 'Remove subscriptions from file',
  },
  remove_from_list_help: {
    id: 'import_remove_from_list_help',
    defaultMessage: 'Upload a file with a list of subscriptions that need to be removed.',
  },
  has_header_label: {
    id: 'import_has_header_label',
    defaultMessage: 'File has header',
  },
  has_header_help: {
    id: 'import_has_header_help',
    defaultMessage: 'Check this field if the uploaded file has an header row.',
  },
  csv_separator_label: {
    id: 'import_csv_separator_label',
    defaultMessage: 'CSV separator',
  },
  csv_separator_help: {
    id: 'import_csv_separator_help',
    defaultMessage: 'Possible values are "," or ";".',
  },
  message_send_error: {
    id: 'modal_import_subscriptions_error',
    defaultMessage: 'Error importing subscriptions.',
  },
  message_send_success: {
    id: 'modal_import_subscriptions_success',
    defaultMessage: 'Subscriptions imported.',
  },
});

const ModalImportSubscriptions = ({ modalIsOpen, toggleModal, onSubmit }) => {
  const intl = useIntl();

  const addSubscriptionStatus = useSelector((state) => state.addSubscription);
  const [formData, setFormData] = useState({});
  const [formFilename, setFormFilename] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData });
    setFormData({});
    setFormFilename('');
  };
  return (
    <Modal id="modal-import-subscriptions" isDismissable isOpen={modalIsOpen} onOpenChange={() => toggleModal(!modalIsOpen)}>
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
            <DropZone className="react-aria-DropZone dropzone-placeholder">
              <FileTrigger
                acceptedFileTypes={['text/csv']}
                allowsMultiple={false}
                onSelect={(e) => {
                  const file = Array.from(e)[0];
                  setFormFilename(file.name);
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    setFormData({ ...formData, file: reader.result });
                  };
                }}
              >
                <Button>{formFilename ? 'Replace file' : 'Select a file'}</Button>
              </FileTrigger>
            </DropZone>
            <Text>{formFilename}</Text>
            {formFilename && (
              <Button
                color="red"
                icon
                labelPosition="right"
                className="react-aria-Button delete-file"
                onClick={() => {
                  setFormData({ ...formData, file: null });
                  setFormFilename('');
                }}
              >
                <i className="icon">
                  <Icon name={trashSVG} size="20px" />
                </i>
              </Button>
            )}
          </div>
          <div className="field">
            <Checkbox
              isSelected={formData.reset_list || false}
              onChange={(v) => {
                setFormData({ ...formData, reset_list: v });
              }}
            >
              <div className="checkbox">
                <svg viewBox="0 0 18 18" aria-hidden="true">
                  <polyline points="1 9 7 14 15 4" />
                </svg>
              </div>
              {intl.formatMessage(messages.reset_list_label)}
              <Text slot="description">{intl.formatMessage(messages.reset_list_help)}</Text>
            </Checkbox>
          </div>
          <div className="field">
            <Checkbox
              isSelected={formData.remove_from_list || false}
              onChange={(v) => {
                setFormData({ ...formData, remove_from_list: v });
              }}
            >
              <div className="checkbox">
                <svg viewBox="0 0 18 18" aria-hidden="true">
                  <polyline points="1 9 7 14 15 4" />
                </svg>
              </div>
              {intl.formatMessage(messages.remove_from_list_label)}
              <Text slot="description">{intl.formatMessage(messages.remove_from_list_help)}</Text>
            </Checkbox>
          </div>
          <div className="field">
            <Checkbox
              isSelected={formData.has_header || false}
              onChange={(v) => {
                setFormData({ ...formData, has_header: v });
              }}
            >
              <div className="checkbox">
                <svg viewBox="0 0 18 18" aria-hidden="true">
                  <polyline points="1 9 7 14 15 4" />
                </svg>
              </div>
              {intl.formatMessage(messages.has_header_label)}
              <Text slot="description">{intl.formatMessage(messages.has_header_help)}</Text>
            </Checkbox>
          </div>
          <div className="field">
            <TextField
              required
              id="csv_separator"
              value={formData.csv_separator || ','}
              onChange={(v) => {
                setFormData({ ...formData, csv_separator: v });
              }}
            >
              <Label>{intl.formatMessage(messages.csv_separator_label)}</Label>
              <Text slot="description">{intl.formatMessage(messages.csv_separator_help)}</Text>
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

export default ModalImportSubscriptions;
