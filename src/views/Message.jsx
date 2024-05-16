import React, { createRef, useState } from 'react';
import { PageHeader, TextOrBlocks, SkipToMainContent } from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import { defineMessages, useIntl } from 'react-intl';
import { NotificationManager } from 'design-react-kit';
import { ModalTestSend, ModalSend } from '../components/manage';

const messages = defineMessages({
  message_preview: {
    id: 'message_preview_label',
    defaultMessage: 'Anteprima del messaggio',
  },
  message_test_send: {
    id: 'message_test_send_label',
    defaultMessage: 'Test di invio',
  },
});

const Message = ({ content, location }) => {
  const intl = useIntl();
  let documentBody = createRef();

  return (
    <>
      <div className="container px-4 my-4 message-view">
        <SkipToMainContent />
        <PageHeader content={content} readingtime={null} showreadingtime={false} showdates={false} showtassonomiaargomenti={false} />
        <div className="row border-top py-5">
          <section ref={documentBody} id="main-content-section" className="it-page-sections-container">
            <TextOrBlocks content={content} />
          </section>
        </div>
        <ModalSend content={content} />
        <ModalTestSend content={content} />
      </div>
      {/* NOTIFICATION MANAGER */}
      <NotificationManager />
    </>
  );
};

export default Message;
