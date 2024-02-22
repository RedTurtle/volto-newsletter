import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import { ObjectBrowserWidget, CheckboxWidget, TextWidget } from '@plone/volto/components';

const messages = defineMessages({
  channel: {
    id: 'channel',
    defaultMessage: 'Canale',
  },
  backgroundImage: {
    id: 'backgroundImage',
    defaultMessage: 'Immagine di sfondo',
  },
  showFullWidth: {
    id: 'show_full_width',
    defaultMessage: 'A tutta larghezza',
  },
  buttonText: {
    id: 'newsletter_subscribe_cta',
    defaultMessage: 'Testo del bottone',
  },
});

const Sidebar = ({ block, data, onChangeBlock, required }) => {
  const intl = useIntl();

  useEffect(() => {
    //set default values
    onChangeBlock(block, {
      ...data,
      showFullWidth: data.showFullWidth === undefined ? true : data.showFullWidth,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="newsletter_subscribe" defaultMessage="Iscrizione newsletter" />
        </h2>
      </header>
      <div className="ui form">
        <ObjectBrowserWidget
          id="channel"
          title={intl.formatMessage(messages.channel)}
          description=""
          required={true}
          widgetOptions={{
            pattern_options: {
              selectableTypes: ['Channel'],
              maximumSelectionSize: 1,
            },
          }}
          value={data.channel ?? []}
          onChange={(id, value) => onChangeBlock(block, { ...data, [id]: value })}
        />

        <ObjectBrowserWidget
          id="background"
          title={intl.formatMessage(messages.backgroundImage)}
          description=""
          required={false}
          widgetOptions={{
            pattern_options: {
              selectableTypes: ['Image'],
              maximumSelectionSize: 1,
            },
          }}
          value={data.background ?? []}
          onChange={(id, value) => onChangeBlock(block, { ...data, [id]: value })}
        />
        <CheckboxWidget
          id="showFullWidth"
          title={intl.formatMessage(messages.showFullWidth)}
          value={data.showFullWidth ? data.showFullWidth : false}
          onChange={(name, checked) => {
            onChangeBlock(block, { ...data, [name]: checked });
          }}
        />

        <TextWidget
          id="buttonText"
          title={intl.formatMessage(messages.buttonText)}
          value={data.buttonText}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              [name]: value,
            });
          }}
        />
      </div>
    </Segment.Group>
  );
};

Sidebar.propTypes = {
  block: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default Sidebar;
