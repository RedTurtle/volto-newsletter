import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Loader, Dimmer } from 'semantic-ui-react';
import { Button, Dialog, Heading, Modal } from 'react-aria-components';
import { defineMessages, useIntl } from 'react-intl';
import { Icon, Toast } from '@plone/volto/components';
import trashSVG from '@plone/volto/icons/delete.svg';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { deleteAllSendHistory } from '../../../actions';
import { useLocation } from 'react-router-dom';

import '@plone/components/styles/basic/Button.css';
import '@plone/components/styles/basic/Modal.css';
import '@plone/components/styles/basic/Dialog.css';
import '../modals.css';

const messages = defineMessages({
  delete_all: {
    id: 'send_history_delete_all',
    defaultMessage: 'Delete all history',
  },
  confirm_delete_all: {
    id: 'send_history_confirm_delete_all',
    defaultMessage: 'Are you sure you want to delete all history?',
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
    id: 'send_history_error_delete_all',
    defaultMessage: 'An error has occurred',
  },
  success_delete_all: {
    id: 'success_label',
    defaultMessage: 'Success',
  },
  delete_all_success: {
    id: 'send_history_delete_all_success',
    defaultMessage: 'All history deleted successfully!',
  },
  delete_all_error: {
    id: 'send_history_delete_all_error',
    defaultMessage: 'An error has occurred while trying to delete all history',
  },
  loading: {
    id: 'send_history_loading',
    defaultMessage: 'Loading...',
  },
});
const SendHistoryPanelMenu = ({ toastify, doSearch }) => {
  const location = useLocation();
  const intl = useIntl();
  const dispatch = useDispatch();

  const pathname = location.pathname.replace('/send-history', '');
  const [openConfirm, setOpenConfirm] = useState(false);
  const deleteAllSendHistoryState = useSelector((state) => state.deleteAllSendHistory);
  const deleteAll = async () => {
    try {
      await dispatch(deleteAllSendHistory(pathname));
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
  return (
    <Menu secondary>
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
              <Button onPress={() => toggleModal(!modalIsOpen)}>X</Button>
            </div>
          </div>

          <div className="content ui ">{intl.formatMessage(messages.confirm_delete_all)}</div>
          <div className="form-action">
            <Button onClick={deleteAll} className="react-aria-Button primary">
              {intl.formatMessage(messages.confirm)}
            </Button>
            <Button className="react-aria-Button cancel" onClick={() => setOpenConfirm(false)}>
              {intl.formatMessage(messages.cancel)}
            </Button>
          </div>
        </Dialog>
      </Modal>
    </Menu>
  );
};

export default injectLazyLibs(['toastify'])(SendHistoryPanelMenu);
