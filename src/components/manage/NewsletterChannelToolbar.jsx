import React, { useMemo } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { useSelector } from 'react-redux';
import { Icon } from '@plone/volto/components';
import { Plug } from '@plone/volto/components/manage/Pluggable';
import NewsletterSVG from '../../icons/newsletter.svg';

import './toolbar.css';

const messages = defineMessages({
  channelActions: {
    id: 'channel_actions_label',
    defaultMessage: 'Channel actions',
  },
});

export const NewsletterChannelToolbar = () => {
  const intl = useIntl();
  const content = useSelector((state) => {
    return state?.content?.data;
  });

  if (content?.['@type'] !== 'Channel') {
    return null;
  }

  const { can_manage } = content?.['@components']?.['channel-actions'] || {};
  if (!can_manage) {
    return null;
  }
  return (
    <Plug pluggable="main.toolbar.bottom" id="channel-actions">
      {({ onClickHandler }) => {
        return (
          <>
            <button className="newsletter-actions" aria-label={intl.formatMessage(messages.channelActions)} onClick={(e) => onClickHandler(e, 'channelActions')} tabIndex={0} id="toolbar-channel-actions">
              <Icon name={NewsletterSVG} size="30px" title={intl.formatMessage(messages.channelActions)} />
            </button>
          </>
        );
      }}
    </Plug>
  );
};

export default NewsletterChannelToolbar;
