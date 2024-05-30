import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { useLocation, Link } from 'react-router-dom';
import { BodyClass } from '@plone/volto/helpers';
import {
  Container,
  Segment,
  Checkbox,
  Table,
  Loader,
  Form,
  Input,
  Message,
} from 'semantic-ui-react';
import { Button, Dialog, Heading, Modal } from 'react-aria-components';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import {
  Pagination,
  Unauthorized,
  Toast,
  Toolbar,
  Icon as IconNext,
} from '@plone/volto/components';
import { getContent } from '@plone/volto/actions';
import { asyncConnect, Helmet, getBaseUrl } from '@plone/volto/helpers';
import {
  getSendHistory,
  deleteSendHistory,
  resetDeleteSendHistory,
} from '../../../actions';
import backSVG from '@plone/volto/icons/back.svg';

import './send-history-panel.css';

const messages = defineMessages({
  send_history_controlpanel: {
    id: 'Send history',
    defaultMessage: 'Send history',
  },
  select_all: {
    id: 'newsletter_panel_select_all',
    defaultMessage: 'Select/Deselect all',
  },
  select_item: {
    id: 'newsletter_panel_select_item',
    defaultMessage: 'Select item',
  },
  all: {
    id: 'newsletter_panel_all',
    defaultMessage: 'All',
  },
  message: {
    id: 'newsletter_panel_message',
    defaultMessage: 'Message',
  },
  subscribers: {
    id: 'newsletter_panel_subscribers',
    defaultMessage: 'Active subscribers',
  },
  start_send: {
    id: 'newsletter_panel_start_send',
    defaultMessage: 'Start send',
  },
  end_send: {
    id: 'newsletter_panel_end_send',
    defaultMessage: 'End send',
  },
  status: {
    id: 'newsletter_panel_status',
    defaultMessage: 'Status',
  },
  filter_title: {
    id: 'newsletter_panel_filter_title',
    defaultMessage: 'Filter title',
  },
  items_selected: {
    id: 'newsletter_panel_items_selected',
    defaultMessage: 'items selected.',
  },
  reset_send_history: {
    id: 'newsletter_panel_reset_send_history',
    defaultMessage: 'Reset history',
  },
  confirm_delete_selected: {
    id: 'newsletter_panel_confirm_delete_selected',
    defaultMessage: 'Are you sure you want to reset the following history?',
  },
  error: {
    id: 'error_label',
    defaultMessage: 'Error',
  },
  success: {
    id: 'success_label',
    defaultMessage: 'Success',
  },
  delete_success: {
    id: 'newsletter_panel_delete_success',
    defaultMessage: 'Selected history deleted successfully!',
  },
  delete_error: {
    id: 'newsletter_panel_delete_error',
    defaultMessage:
      'An error has occurred while trying to delete history for {element}',
  },
  cancel: {
    id: 'button_cancel',
    defaultMessage: 'Cancel',
  },
  confirm: {
    id: 'button_confirm',
    defaultMessage: 'Confirm',
  },
  no_results: {
    id: 'newsletter_panel_no_results',
    defaultMessage: 'No results found',
  },
  loading: {
    id: 'newsletter_panel_loading',
    defaultMessage: 'Loading...',
  },
  statusInProgress: {
    id: 'newsletter_panel_status_in_progress',
    defaultMessage: 'In progress',
  },
  statusSent: {
    id: 'newsletter_panel_status_sent',
    defaultMessage: 'Sent',
  },
  statusError: {
    id: 'newsletter_panel_status_error',
    defaultMessage: 'Error',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  tot_filtered: {
    id: 'tot_results_filtered',
    defaultMessage: '{totResults} results (filtered).',
  },
  tot_unfiltered: {
    id: 'tot_results_unfiltered',
    defaultMessage: '{totResults} results.',
  },
});
const SendHistoryPanel = ({ toastify, content }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname.replace('/send-history', '');
  const history = useSelector((state) => state.getSendHistory);
  const deleteSendHistoryState = useSelector(
    (state) => state?.deleteSendHistory,
  );

  const [b_size, setB_size] = useState(50);

  const [currentPage, setCurrentPage] = useState(0);
  const [searchableText, setSearchableText] = useState('');
  const [text, setText] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [itemsSelected, setItemsSelected] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setText(searchableText);
    }, 1200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchableText]);

  const isUnauthorized = history?.error?.status === 401;

  if (isUnauthorized) {
    return <Unauthorized />;
  }

  const deleteSendHistoryEnd = deleteSendHistoryState?.loaded;

  const doSearch = () => {
    return dispatch(
      getSendHistory(pathname, {
        b_size: isNaN(b_size) ? 10000000 : b_size,
        b_start: currentPage * (isNaN(b_size) ? 10000000 : b_size),
        text: text && text.length > 0 ? text : null,
      }),
    );
  };

  useEffect(() => {
    doSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [b_size, currentPage, text]);

  const resetSelectedSendHistory = async () => {
    // eslint-disable-next-line no-unused-expressions
    try {
      await dispatch(deleteSendHistory(pathname, { uids: itemsSelected }));
      setShowConfirmDelete(false);
      toastify.toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.success)}
          content={intl.formatMessage(messages.delete_success)}
        />,
      );
    } catch (e) {
      console.error(e);
      toastify.toast.error(
        <Toast
          error
          title={intl.formatMessage(messages.error)}
          content={intl.formatMessage(messages.delete_error, {
            element: e?.item?.title ?? '',
          })}
        />,
      );
    }
  };

  useEffect(() => {
    if (deleteSendHistoryEnd) {
      doSearch().then(() => {
        setItemsSelected([]);
      });
      dispatch(resetDeleteSendHistory());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteSendHistoryEnd]);

  const getItemStatus = (item) => {
    if (item.running) {
      return intl.formatMessage(messages.statusInProgress);
    }
    return item.completed
      ? intl.formatMessage(messages.statusSent)
      : intl.formatMessage(messages.statusError);
  };

  const totResults = history.result?.items_total || 0;

  return (
    <>
      <BodyClass className="newsletter-management" />
      <Container id="page-send-history" className="controlpanel-send-history">
        <Helmet
          title={intl.formatMessage(messages.send_history_controlpanel)}
        />
        <Segment.Group raised>
          <Segment className="primary">
            {intl.formatMessage(messages.send_history_controlpanel)}
          </Segment>

          <Segment>
            {history.result?.items ? (
              <p>
                {searchableText.length
                  ? intl.formatMessage(messages.tot_filtered, { totResults })
                  : intl.formatMessage(messages.tot_unfiltered, { totResults })}
              </p>
            ) : (
              ''
            )}
            {itemsSelected.length > 0 && (
              <Message className="selected-items" color="teal">
                <div className="text">
                  {itemsSelected?.length}{' '}
                  {intl.formatMessage(messages.items_selected)}
                </div>
                <div className="actions">
                  <Button
                    type="button"
                    className="react-aria-Button cancel"
                    onClick={() => setShowConfirmDelete(true)}
                  >
                    {intl.formatMessage(messages.reset_send_history)}
                  </Button>
                </div>
              </Message>
            )}
            <Form className="search-form">
              <Input
                fluid
                icon="search"
                value={searchableText}
                onChange={(e) => {
                  setSearchableText(e.target.value);
                }}
                placeholder={intl.formatMessage(messages.filter_title)}
              />
            </Form>
            <Table selectable compact singleLine attached fixed striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    width={1}
                    textAlign="center"
                    verticalAlign="middle"
                  >
                    <Checkbox
                      title={intl.formatMessage(messages.select_all)}
                      checked={
                        history?.result?.items?.length !== 0 &&
                        itemsSelected?.length === history?.result?.items?.length
                      }
                      onChange={(e, o) => {
                        if (o.checked) {
                          setItemsSelected(
                            history?.result?.items.map((x) => x.uid),
                          );
                        } else {
                          setItemsSelected([]);
                        }
                      }}
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell width={4}>
                    {intl.formatMessage(messages.message)}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={2}>
                    {intl.formatMessage(messages.subscribers)}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={3}>
                    {intl.formatMessage(messages.start_send)}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={3}>
                    {intl.formatMessage(messages.end_send)}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={2}>
                    {intl.formatMessage(messages.status)}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {history?.loaded &&
                  history.result?.items?.map((item, i) => (
                    <tr key={item.uid}>
                      <Table.Cell textAlign="center">
                        <Checkbox
                          title={intl.formatMessage(messages.select_item)}
                          checked={itemsSelected.some((is) => is === item.uid)}
                          onChange={(e, o) => {
                            if (o.checked) {
                              let s = [...itemsSelected];
                              s.push(item.uid);
                              setItemsSelected(s);
                            } else {
                              setItemsSelected(
                                itemsSelected.filter((i) => i !== item.uid),
                              );
                            }
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell>{item.message}</Table.Cell>
                      <Table.Cell>{item.subscribers}</Table.Cell>
                      <Table.Cell textAlign="center">
                        {item.send_date_start}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {item.send_date_end}
                      </Table.Cell>
                      <Table.Cell>{getItemStatus(item)}</Table.Cell>
                    </tr>
                  ))}
              </Table.Body>
            </Table>
            {history?.loading && <Loader active inline="centered" />}
            {history?.result?.items?.length === 0 && (
              <div className="no-results">
                {intl.formatMessage(messages.no_results)}
              </div>
            )}

            <div className="contents-pagination">
              <Pagination
                current={currentPage}
                total={Math.ceil(history?.result?.items_total / b_size)}
                pageSize={b_size}
                pageSizes={[50, intl.formatMessage(messages.all)]}
                onChangePage={(e, p) => {
                  setCurrentPage(p.value);
                }}
                onChangePageSize={(e, s) => setB_size(s.value)}
              />
            </div>
          </Segment>
        </Segment.Group>
        {showConfirmDelete && (
          <Modal
            className="react-aria-Modal newsletter-modal"
            isDismissable
            isOpen={showConfirmDelete}
            onOpenChange={() => setShowConfirmDelete(showConfirmDelete)}
          >
            <Dialog>
              <div className="modal-header">
                <Heading>
                  {intl.formatMessage(messages.confirm_delete_selected)}
                </Heading>
                <div className="close">
                  <Button onPress={() => setShowConfirmDelete(false)}>X</Button>
                </div>
              </div>

              <div className="form-action">
                <Button
                  onClick={resetSelectedSendHistory}
                  className="react-aria-Button primary"
                >
                  {intl.formatMessage(messages.confirm)}
                </Button>
                <Button
                  className="react-aria-Button cancel"
                  onClick={() => setShowConfirmDelete(false)}
                >
                  {intl.formatMessage(messages.cancel)}
                </Button>
              </div>
            </Dialog>
          </Modal>
        )}
      </Container>
      {__CLIENT__ &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <Link to={`${getBaseUrl(pathname)}`} className="item">
                <IconNext
                  name={backSVG}
                  className="contents circled"
                  size="30px"
                  title={intl.formatMessage(messages.back)}
                />
              </Link>
            }
          />,
          document.getElementById('toolbar'),
        )}
    </>
  );
};

export default compose(
  injectLazyLibs(['toastify']),
  asyncConnect([
    {
      key: 'content',
      promise: async ({ location, store: { dispatch } }) => {
        const pathname = location.pathname.replace('/send-history', '');
        const content = await dispatch(getContent(getBaseUrl(pathname)));
        return content;
      },
    },
  ]),
)(SendHistoryPanel);
