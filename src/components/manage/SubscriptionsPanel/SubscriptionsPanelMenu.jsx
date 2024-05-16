import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Loader, Dimmer } from 'semantic-ui-react';
import { Button, Dialog, Heading, Modal } from 'react-aria-components';
import { defineMessages, useIntl } from 'react-intl';
import { Icon, Toast } from '@plone/volto/components';
import trashSVG from '@plone/volto/icons/delete.svg';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { deleteAllSubscriptions, addSubscription, exportSubscriptions, importSubscriptions } from '../../../actions';
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
  delete_all: {
    id: 'subscriptions_delete_all',
    defaultMessage: 'Delete all subscriptions',
  },
  confirm_delete_all: {
    id: 'subscriptions_confirm_delete_all',
    defaultMessage: 'Are you sure you want to delete all subscriptions?',
  },
  cancel: {
    id: 'button_cancel',
    defaultMessage: 'Cancel',
  },
  confirm: {
    id: 'button_confirm',
    defaultMessage: 'Confirm',
  },
  error_delete_all: {
    id: 'subscriptions_error_delete_all',
    defaultMessage: 'An error has occurred',
  },
  success_delete_all: {
    id: 'success_label',
    defaultMessage: 'Success',
  },
  delete_all_success: {
    id: 'subscriptions_delete_all_success',
    defaultMessage: 'All subscriptions deleted successfully!',
  },
  delete_all_error: {
    id: 'subscriptions_delete_all_error',
    defaultMessage: 'An error has occurred while trying to delete all history',
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

  const [addSubscriptionModalIsOpen, toggleAddSubscriptionModal] = useState(false);
  const [importSubscriptionModalIsOpen, toggleImportSubscriptionsModal] = useState(false);

  const pathname = location.pathname.replace('/subscriptions', '');
  const [openConfirm, setOpenConfirm] = useState(false);

  const content = useSelector((state) => state.content?.data);
  const deleteAllSubscriptionsState = useSelector((state) => state.deleteAllSubscriptions);

  const addSubscriptionStatus = useSelector((state) => state.addSubscription);
  const importSubscriptionsStatus = useSelector((state) => state.importSubscriptions);

  // add subscription handlers
  useEffect(() => {
    if (addSubscriptionStatus.error) {
      /* SEND FAIL */
      toggleAddSubscriptionModal(false);
      const msg = addSubscriptionStatus.error?.response?.body?.message || intl.formatMessage(messages.subscribe_add_error);
      toastify.toast.error(<Toast error content={msg} />);
    }
    if (addSubscriptionStatus.loaded) {
      /* CHANGE SUCCESS */
      toggleAddSubscriptionModal(false);
      toastify.toast.success(<Toast success content={intl.formatMessage(messages.subscribe_add_success)} />);
    }
  }, [addSubscriptionStatus]);

  const submitAddSubscription = async (data) => {
    await dispatch(addSubscription(pathname, data));
    doSearch();
  };

  // delete all handlers
  const deleteAll = async () => {
    try {
      await dispatch(deleteAllSubscriptions(pathname));
      setOpenConfirm(false);
      toastify.toast.success(<Toast success title={intl.formatMessage(messages.success_delete_all)} content={intl.formatMessage(messages.delete_all_success)} />);
      doSearch();
    } catch (e) {
      console.error(e);
      toastify.toast.error(
        <Toast
          error
          title={intl.formatMessage(messages.error_delete_all)}
          content={intl.formatMessage(messages.delete_all_error, {
            element: e?.item?.title ?? '',
          })}
        />,
      );
    }
  };

  // import subscriptions handlers
  useEffect(() => {
    if (importSubscriptionsStatus.error) {
      /* SEND FAIL */
      toggleImportSubscriptionsModal(false);
      const msg = importSubscriptionsStatus.error?.response?.body?.message || intl.formatMessage(messages.subscribe_import_error);
      toastify.toast.error(<Toast error content={msg} />);
    }
    if (importSubscriptionsStatus.loaded) {
      /* CHANGE SUCCESS */
      toggleImportSubscriptionsModal(false);
      toastify.toast.success(<Toast success content={intl.formatMessage(messages.subscribe_import_success)} />);
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
            {intl.formatMessage(messages.download_list)} <i className="icon">
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
        <Menu.Menu position="right">
          <Menu.Item>
            <Button className="react-aria-Button cancel" icon labelPosition="right" onClick={() => setOpenConfirm(true)}>
              {intl.formatMessage(messages.delete_all)}
              <i className="icon">
                <Icon name={trashSVG} size="20px" />
              </i>
            </Button>
          </Menu.Item>
        </Menu.Menu>
        <Modal isDismissable isOpen={openConfirm} onOpenChange={() => setOpenConfirm(!openConfirm)}>
          <Dialog>
            <div className="modal-header">
              <Heading>{intl.formatMessage(messages.delete_all)}</Heading>
              <div className="close">
                <Button onPress={() => setOpenConfirm(!openConfirm)}>X</Button>
              </div>
            </div>

            <div className="content ui ">
              {!deleteAllSubscriptionsState.loaded && deleteAllSubscriptionsState.loading && (
                <Dimmer active>
                  <Loader inverted inline="centered" size="large">
                    {intl.formatMessage(messages.loading)}
                  </Loader>
                </Dimmer>
              )}
              {!deleteAllSubscriptionsState.loading && intl.formatMessage(messages.confirm_delete_all)}
            </div>
            <div className="form-action">
              <Button onClick={deleteAll} className="react-aria-Button primary">
                {addSubscriptionStatus?.loading && <Icon icon="it-refresh" className="icon-sm load-status-icon" color="white" />} {intl.formatMessage(messages.confirm)}
              </Button>
              <Button className="react-aria-Button cancel" onClick={() => setOpenConfirm(false)}>
                {intl.formatMessage(messages.cancel)}
              </Button>
            </div>
          </Dialog>
        </Modal>
      </Menu>
      <ModalAddSubscription modalIsOpen={addSubscriptionModalIsOpen} toggleModal={toggleAddSubscriptionModal} onSubmit={submitAddSubscription}></ModalAddSubscription>
      <ModalImportSubscriptions modalIsOpen={importSubscriptionModalIsOpen} toggleModal={toggleImportSubscriptionsModal} onSubmit={submitImportSubscriptions}></ModalImportSubscriptions>
    </>
  );
};

export default injectLazyLibs(['toastify'])(SubscriptionsPanelMenu);
