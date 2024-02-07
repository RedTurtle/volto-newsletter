import React, {createRef} from 'react';
import {
  PageHeader,
  RichTextRender,
  SkipToMainContent,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';

const Message = ({ content, location }) => {
  let documentBody = createRef();

  return (
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

            <RichTextRender
              data={content.text}
            />
          </section>
        </div>
      </div>
  );
};

export default Message;
