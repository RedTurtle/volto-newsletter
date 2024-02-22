import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { UniversalLink } from '@plone/volto/components';
import { Button } from 'design-react-kit';

const messages = defineMessages({
  subscribe: {
    id: 'Newsletter block: subscribe',
    defaultMessage: 'Iscriviti',
  },
});

const SubscribeButton = ({ channel, data, inEditMode = false }) => {
  const text = data.buttonText ?? intl.formatMessage(messages.subscribe);
  return (
    <Button color="primary" tag={UniversalLink} item={inEditMode ? null : channel} href={inEditMode ? '#' : null} aria-label={channel.title + ': ' + text}>
      {text}
    </Button>
  );
};

export default SubscribeButton;
