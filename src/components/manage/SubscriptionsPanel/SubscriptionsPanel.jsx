import React, { useState, useEffect, useMemo } from 'react';
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
  Dimmer,
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
  getSubscriptions,
  deleteSubscriptions,
  resetDeleteSubscriptions,
} from '../../../actions';
import SubscriptionsPanelMenu from './SubscriptionsPanelMenu';

import backSVG from '@plone/volto/icons/back.svg';
import './subscriptions-panel.css';

const messages = defineMessages({
  subscriptions_controlpanel: {
    id: 'subscriptions_title',
    defaultMessage: 'Manage subscriptions',
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
  filter_title: {
    id: 'newsletter_panel_filter_title',
    defaultMessage: 'Filter title',
  },
  items_selected: {
    id: 'newsletter_panel_items_selected',
    defaultMessage: 'items selected.',
  },
  delete_subscriptions: {
    id: 'newsletter_panel_delete_send_subscriptions',
    defaultMessage: 'Delete subscriptions',
  },
  confirm_delete_selected: {
    id: 'newsletter_panel_confirm_delete_selected_subscriptions',
    defaultMessage:
      'Are you sure you want to delete the following subscriptions?',
  },
  error: {
    id: 'newsletter_panel_error',
    defaultMessage: 'An error has occurred',
  },
  success: {
    id: 'success_label',
    defaultMessage: 'Success',
  },
  delete_subscriptions_success: {
    id: 'newsletter_panel_delete_subscriptions_success',
    defaultMessage: 'Subscriptions deleted successfully!',
  },
  delete_subscriptions_error: {
    id: 'newsletter_panel_delete_subscriptions_error',
    defaultMessage:
      'An error has occurred while trying to delete subscriptions',
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
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  email: {
    id: 'subscriptions_email',
    defaultMessage: 'Email',
  },
  state: {
    id: 'subscriptions_state',
    defaultMessage: 'State',
  },
  creation_date: {
    id: 'subscriptions_creation_date',
    defaultMessage: 'Creation date',
  },
  subscription_state_active: {
    id: 'subscription_state_active',
    defaultMessage: 'Active',
  },
  subscription_state_inactive: {
    id: 'subscription_state_inactive',
    defaultMessage: 'Inactive',
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

const SubscriptionsPanel = ({ toastify }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname.replace('/subscriptions', '');
  const subscriptions = useSelector((state) => state.getSubscriptions);
  const content = useSelector((state) => state.content);
  const deleteSubscriptionsState = useSelector(
    (state) => state?.deleteSubscriptions,
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
      // Send Axios request here
    }, 1200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchableText]);

  const isUnauthorized = useMemo(
    () => subscriptions?.error && subscriptions?.error?.status === 401,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [subscriptions?.error],
  );

  // if (content?.['@type'] !== 'Channel') {
  //   return <NotFound />;
  // }
  if (isUnauthorized) {
    return <Unauthorized />;
  }

  const deleteSubscriptionsEnd = deleteSubscriptionsState?.loaded;

  const doSearch = () => {
    return dispatch(
      getSubscriptions(pathname, {
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

  const resetSelectedSubscriptions = async () => {
    // eslint-disable-next-line no-unused-expressions
    try {
      await dispatch(deleteSubscriptions(pathname, { email: itemsSelected }));
      setShowConfirmDelete(false);
      toastify.toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.success)}
          content={intl.formatMessage(messages.delete_subscriptions_success)}
        />,
      );
    } catch (e) {
      console.error(e);
      toastify.toast.error(
        <Toast
          error
          title={intl.formatMessage(messages.error)}
          content={intl.formatMessage(messages.delete_subscriptions_error, {
            element: e?.item?.title ?? '',
          })}
        />,
      );
    }
  };

  useEffect(() => {
    if (deleteSubscriptionsEnd) {
      doSearch().then(() => {
        setItemsSelected([]);
      });
      dispatch(resetDeleteSubscriptions());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteSubscriptionsEnd]);

  const totResults = subscriptions.result?.items_total
    ? subscriptions.result?.items_total
    : 0;

  return (
    <>
      <BodyClass className="newsletter-management" />
      <Container id="page-subscriptions" className="controlpanel-subscriptions">
        <Helmet
          title={intl.formatMessage(messages.subscriptions_controlpanel)}
        />
        <Segment.Group raised>
          <Segment className="primary">
            {intl.formatMessage(messages.subscriptions_controlpanel)}
          </Segment>

          <SubscriptionsPanelMenu doSearch={doSearch} />

          <Segment>
            {subscriptions.result?.items ? (
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
                    {intl.formatMessage(messages.delete_subscriptions)}
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
                        subscriptions?.result?.items?.length !== 0 &&
                        itemsSelected?.length ===
                          subscriptions?.result?.items?.length
                      }
                      onChange={(e, o) => {
                        if (o.checked) {
                          setItemsSelected(
                            subscriptions?.result?.items.map((x) => x.email),
                          );
                        } else {
                          setItemsSelected([]);
                        }
                      }}
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell width={4}>
                    {intl.formatMessage(messages.email)}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={3}>
                    {intl.formatMessage(messages.creation_date)}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center" width={3}>
                    {intl.formatMessage(messages.state)}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {subscriptions?.loaded &&
                  subscriptions.result?.items?.map((item, i) => (
                    <tr key={`subscription-${item.id}`}>
                      <Table.Cell textAlign="center">
                        <Checkbox
                          title={intl.formatMessage(messages.select_item)}
                          checked={itemsSelected.some(
                            (is) => is === item.email,
                          )}
                          onChange={(e, o) => {
                            if (o.checked) {
                              let s = [...itemsSelected];
                              s.push(item.email);
                              setItemsSelected(s);
                            } else {
                              setItemsSelected(
                                itemsSelected.filter((i) => i !== item.email),
                              );
                            }
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell>{item.email}</Table.Cell>
                      <Table.Cell>{item.creation_date}</Table.Cell>
                      <Table.Cell>
                        {item.is_active
                          ? intl.formatMessage(
                              messages.subscription_state_active,
                            )
                          : intl.formatMessage(
                              messages.subscription_state_inactive,
                            )}
                      </Table.Cell>
                    </tr>
                  ))}
              </Table.Body>
            </Table>
            {subscriptions?.loading && <Loader active inline="centered" />}
            {subscriptions?.result?.items?.length === 0 && (
              <div className="no-results">
                {intl.formatMessage(messages.no_results)}
              </div>
            )}

            <div className="contents-pagination">
              <Pagination
                current={currentPage}
                total={Math.ceil(subscriptions?.result?.items_total / b_size)}
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

              <div className="content ui ">
                <div className="content ui ">
                  {deleteSubscriptionsState?.loading &&
                    !deleteSubscriptionsEnd && (
                      <Dimmer active>
                        <Loader inverted inline="centered" size="large">
                          {intl.formatMessage(messages.loading)}
                        </Loader>
                      </Dimmer>
                    )}
                  {!deleteSubscriptionsState?.loading &&
                    itemsSelected?.map((item, i) => (
                      <div className="confirm-delete-item" key={item}>
                        {item}
                      </div>
                    ))}
                </div>
              </div>
              <div className="form-action">
                <Button
                  onClick={resetSelectedSubscriptions}
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
        const pathname = location.pathname.replace('/subscriptions', '');
        const content = await dispatch(getContent(getBaseUrl(pathname)));
        return content;
      },
    },
  ]),
)(SubscriptionsPanel);
