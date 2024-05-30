/**
 * Message Actions container.
 * @module components/manage/Toolbar/PersonalTools
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { BodyClass } from '@plone/volto/helpers';
import { useIntl, defineMessages } from 'react-intl';
import { UniversalLink } from '@plone/volto/components';

import './toolbar.css';

const messages = defineMessages({
  channelActions: {
    id: 'channel_actions_label',
    defaultMessage: 'Channel actions',
  },
  sendHistory: {
    id: 'send_history_label',
    defaultMessage: 'Send history',
  },
  manageSubscriptions: {
    id: 'manage_subscriptions_label',
    defaultMessage: 'Manage subscriptions',
  },
});

export const ChannelActionsMenu = ({ theToolbar }) => {
  const intl = useIntl();
  const content = useSelector((state) => {
    return state?.content?.data;
  });

  return (
    <>
      <BodyClass className="has-toolbar-newsletter-actions-open" />
      <div
        className="pastanaga-menu"
        style={{
          flex: theToolbar.current
            ? `0 0 ${theToolbar.current.getBoundingClientRect().width}px`
            : null,
          bottom: '0px',
        }}
      >
        <header>
          <h2>{intl.formatMessage(messages.channelActions)}</h2>
        </header>
        <div className="pastanaga-menu-list">
          <ul>
            <li>
              <UniversalLink href={`${content['@id']}/send-history`}>
                {intl.formatMessage(messages.sendHistory)}
              </UniversalLink>
            </li>
            <li>
              <UniversalLink href={`${content['@id']}/subscriptions`}>
                {intl.formatMessage(messages.manageSubscriptions)}
              </UniversalLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ChannelActionsMenu;
