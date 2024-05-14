import React, { useMemo } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { useSelector } from 'react-redux';
import { Icon } from '@plone/volto/components';
import { Plug } from '@plone/volto/components/manage/Pluggable';
import NewsletterSVG from '../../icons/newsletter.svg';

import './toolbar.css';

const messages = defineMessages({
  messageActions: {
    id: 'message_actions_label',
    defaultMessage: 'Message actions',
  },
});

export const NewsletterMessageToolbar = () => {
  const intl = useIntl();
  const content = useSelector((state) => {
    return state?.content?.data;
  });

  if (content?.['@type'] !== 'Message') {
    return null;
  }

  const { can_manage, can_send } = content?.['@components']?.['message-actions'] || {};
  if (!can_manage && !can_send) {
    return null;
  }
  return (
    <Plug pluggable="main.toolbar.bottom" id="message-actions">
      {({ onClickHandler }) => {
        return (
          <>
            <button className="newsletter-actions" aria-label={intl.formatMessage(messages.messageActions)} onClick={(e) => onClickHandler(e, 'messageActions')} tabIndex={0} id="toolbar-message-actions">
              <Icon name={NewsletterSVG} size="30px" title={intl.formatMessage(messages.messageActions)} />
            </button>
          </>
        );
      }}
    </Plug>
  );
};

export default NewsletterMessageToolbar;
