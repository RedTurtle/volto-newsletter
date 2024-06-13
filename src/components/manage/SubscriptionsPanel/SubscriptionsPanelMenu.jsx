import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Loader, Dimmer } from 'semantic-ui-react';
import { Button, Dialog, Heading, Modal } from 'react-aria-components';
import { defineMessages, useIntl } from 'react-intl';
import { Icon, Toast } from '@plone/volto/components';
import trashSVG from '@plone/volto/icons/delete.svg';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import {
  addSubscription,
  exportSubscriptions,
  importSubscriptions,
} from '../../../actions';
import { useLocation } from 'react-router-dom';
import downloadSVG from '@plone/volto/icons/download.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';
import ModalAddSubscription from './ModalAddSubscription';
import ModalImportSubscriptions from './ModalImportSubscriptions';

import '@plone/components/src/styles/basic/Button.css';
import '@plone/components/src/styles/basic/Modal.css';
import '@plone/components/src/styles/basic/Dialog.css';
import '../modals.css';

const messages = defineMessages({
  cancel: {
    id: 'button_cancel',
    defaultMessage: 'Cancel',
  },
  confirm: {
    id: 'button_confirm',
    defaultMessage: 'Confirm',
  },
  loading: {
    id: 'subscriptions_loading',
    defaultMessage: 'Loading...',
  },
  add_subscriber: {
    id: 'subscriptions_add_subscriber',
    defaultMessage: 'Add subscriber',
  },
  download_list: {
    id: 'subscriptions_download_list',
    defaultMessage: 'Download',
  },
  upload_list: {
    id: 'subscriptions_upload_list',
    defaultMessage: 'Upload',
  },
  subscribe_add_success: {
    id: 'subscribe_add_success',
    defaultMessage: 'Subscription added.',
  },
  subscribe_add_error: {
    id: 'subscribe_add_error',
    defaultMessage: 'An error has occurred trying to add subscription.',
  },
  subscribe_import_success: {
    id: 'subscribe_import_success',
    defaultMessage: 'Subscriptions imported.',
  },
  subscribe_import_error: {
    id: 'subscribe_import_error',
    defaultMessage: 'An error has occurred trying to import subscriptions.',
  },
  error: {
    id: 'panel_error',
    defaultMessage: 'Error',
  },
});
const SubscriptionsPanelMenu = ({ toastify, doSearch }) => {
  const location = useLocation();
  const intl = useIntl();
  const dispatch = useDispatch();

  const [addSubscriptionModalIsOpen, toggleAddSubscriptionModal] =
    useState(false);
  const [importSubscriptionModalIsOpen, toggleImportSubscriptionsModal] =
    useState(false);

  const pathname = location.pathname.replace('/subscriptions', '');
  const [openConfirm, setOpenConfirm] = useState(false);

  const content = useSelector((state) => state.content?.data);

  const addSubscriptionStatus = useSelector((state) => state.addSubscription);
  const importSubscriptionsStatus = useSelector(
    (state) => state.importSubscriptions,
  );

  // add subscription handlers
  useEffect(() => {
    if (addSubscriptionStatus.error) {
      /* SEND FAIL */
      toggleAddSubscriptionModal(false);
      const msg =
        addSubscriptionStatus.error?.response?.body?.message ||
        intl.formatMessage(messages.subscribe_add_error);
      toastify.toast.error(<Toast error content={msg} />);
    }
    if (addSubscriptionStatus.loaded) {
      /* CHANGE SUCCESS */
      toggleAddSubscriptionModal(false);
      toastify.toast.success(
        <Toast
          success
          content={intl.formatMessage(messages.subscribe_add_success)}
        />,
      );
    }
  }, [addSubscriptionStatus]);

  const submitAddSubscription = async (data) => {
    await dispatch(addSubscription(pathname, data));
    doSearch();
  };

  // import subscriptions handlers
  useEffect(() => {
    if (importSubscriptionsStatus.error) {
      /* SEND FAIL */
      toggleImportSubscriptionsModal(false);
      const msg =
        importSubscriptionsStatus.error?.response?.body?.message ||
        intl.formatMessage(messages.subscribe_import_error);
      toastify.toast.error(<Toast error content={msg} />);
    }
    if (importSubscriptionsStatus.loaded) {
      /* CHANGE SUCCESS */
      toggleImportSubscriptionsModal(false);
      toastify.toast.success(
        <Toast
          success
          content={intl.formatMessage(messages.subscribe_import_success)}
        />,
      );
    }
  }, [importSubscriptionsStatus]);

  const submitImportSubscriptions = async (data) => {
    await dispatch(importSubscriptions(pathname, data));
    doSearch();
  };

  return (
    <>
      <Menu secondary>
        <Menu.Item>
          <Button
            className="react-aria-Button primary"
            onClick={() => {
              toggleAddSubscriptionModal(true);
            }}
          >
            {intl.formatMessage(messages.add_subscriber)}
          </Button>
          <Button
            className="react-aria-Button primary"
            labelPosition="right"
            icon
            onClick={() => {
              dispatch(exportSubscriptions(pathname, content?.id));
            }}
          >
            {intl.formatMessage(messages.download_list)}{' '}
            <i className="icon">
              <Icon name={downloadSVG} size="20px" />
            </i>
          </Button>
          <Button
            className="react-aria-Button primary"
            labelPosition="right"
            icon
            onClick={() => {
              toggleImportSubscriptionsModal(true);
            }}
          >
            {intl.formatMessage(messages.upload_list)}
            <i className="icon">
              <Icon name={uploadSVG} size="20px" />
            </i>
          </Button>
        </Menu.Item>
      </Menu>
      <ModalAddSubscription
        modalIsOpen={addSubscriptionModalIsOpen}
        toggleModal={toggleAddSubscriptionModal}
        onSubmit={submitAddSubscription}
      ></ModalAddSubscription>
      <ModalImportSubscriptions
        modalIsOpen={importSubscriptionModalIsOpen}
        toggleModal={toggleImportSubscriptionsModal}
        onSubmit={submitImportSubscriptions}
      ></ModalImportSubscriptions>
    </>
  );
};

export default injectLazyLibs(['toastify'])(SubscriptionsPanelMenu);
