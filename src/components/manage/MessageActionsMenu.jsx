/**
 * Message Actions container.
 * @module components/manage/Toolbar/PersonalTools
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BodyClass } from '@plone/volto/helpers';
import { useIntl, defineMessages } from 'react-intl';
import { messageTestSendToggleModal, messageSendToggleModal } from '../../actions';
import { UniversalLink } from '@plone/volto/components';

import { Button } from 'design-react-kit';

import './toolbar.css';

const messages = defineMessages({
  messageActions: {
    id: 'message_actions_label',
    defaultMessage: 'Message actions',
  },
  message_preview: {
    id: 'message_preview_label',
    defaultMessage: 'See message preview',
  },
  message_test_send: {
    id: 'message_test_send_label',
    defaultMessage: 'Test send',
  },
  message_send: {
    id: 'message_send_label',
    defaultMessage: 'Send the message',
  },
  message_resend: {
    id: 'message_resend_label',
    defaultMessage: 'Re-send the message',
  },
});

export const MessageActionsMenu = ({ theToolbar }) => {
  const intl = useIntl();
  const content = useSelector((state) => {
    return state?.content?.data;
  });
  const { can_send, already_sent } = content?.['@components']?.['message-actions'] || {};

  const sendLabel = already_sent ? messages.message_resend : messages.message_send;
  const dispatch = useDispatch();

  return (
    <>
      <BodyClass className="has-toolbar-newsletter-actions-open" />
      <div
        className="pastanaga-menu"
        style={{
          flex: theToolbar.current ? `0 0 ${theToolbar.current.getBoundingClientRect().width}px` : null,
          bottom: '0px',
        }}
      >
        <header>
          <h2>{intl.formatMessage(messages.messageActions)}</h2>
        </header>
        <div className="pastanaga-menu-list">
          <ul>
            <li>
              <UniversalLink href={`${content['@id']}/messagepreview_view`}>{intl.formatMessage(messages.message_preview)}</UniversalLink>
            </li>
            <li>
              <Button
                color="primary"
                className="ms-3 send-message"
                onClick={() => {
                  dispatch(messageTestSendToggleModal(true));
                }}
                title={intl.formatMessage(messages.message_test_send)}
              >
                {intl.formatMessage(messages.message_test_send)}
              </Button>
            </li>
            {can_send && (
              <li>
                <Button
                  color="primary"
                  className="ms-3 send-message"
                  onClick={() => {
                    dispatch(messageSendToggleModal(true));
                  }}
                  title={intl.formatMessage(sendLabel)}
                >
                  {intl.formatMessage(sendLabel)}
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MessageActionsMenu;
