import React, { createRef, useState } from 'react';
import {
  PageHeader,
  TextOrBlocks,
  SkipToMainContent,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import { ModalTestSend, ModalSend } from '../components/manage';
import { BodyClass } from '@plone/volto/helpers';

const Message = ({ content }) => {
  let documentBody = createRef();

  return (
    <>
      <BodyClass className="newsletter-management" />
      <div className="container px-4 my-4 message-view">
        <SkipToMainContent />
        <PageHeader
          content={content}
          readingtime={null}
          showreadingtime={false}
          showdates={false}
          showtassonomiaargomenti={false}
        />
        <div className="row border-top py-5">
          <section
            ref={documentBody}
            id="main-content-section"
            className="it-page-sections-container"
          >
            <TextOrBlocks content={content} />
          </section>
        </div>
        <ModalSend content={content} />
        <ModalTestSend content={content} />
      </div>
    </>
  );
};

export default Message;
