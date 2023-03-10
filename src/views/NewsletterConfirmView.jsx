import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import NewsletterConfirmSubscribe from './NewsletterConfirmSubscribe';
import NewsletterConfirmUnsubscribe from './NewsletterConfirmUnsubscribe';

const messages = defineMessages({
  subscribeNewsletterConfirmViewTitle: {
    id: 'subscribeNewsletterConfirmViewTitle',
    defaultMessage: 'Conferma richiesta',
  },
  unsubscribeNewsletterConfirmViewTitle: {
    id: 'unsubscribeNewsletterConfirmViewTitle',
    defaultMessage: 'Conferma richiesta',
  },
});

const NewsletterConfirmView = ({ location }) => {
  const intl = useIntl();

  const { secret, action } = Object.fromEntries(
    new URLSearchParams(location.search),
  );

  return (
    <div id="page-document" className="ui container newsletter-confirm px-4">
      <div className="mb-4">
        <div className="px-0 py-lg-2 col-lg-8">
          <h1>
            {intl.formatMessage(
              messages[`${action}NewsletterConfirmViewTitle`],
            )}
          </h1>
        </div>
        {action === 'subscribe' ? (
          <NewsletterConfirmSubscribe
            secret={secret}
            action={action}
            location={location}
          />
        ) : (
          <NewsletterConfirmUnsubscribe
            secret={secret}
            action={action}
            location={location}
          />
        )}
      </div>
    </div>
  );
};

export default NewsletterConfirmView;
