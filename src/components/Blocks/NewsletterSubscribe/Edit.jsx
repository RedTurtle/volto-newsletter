import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { Container } from 'design-react-kit';
import { SidebarPortal } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { getContent } from '@plone/volto/actions';
import { TextEditorWidget } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { useHandleDetachedBlockFocus } from 'design-comuni-plone-theme/helpers/blocks';
import Sidebar from 'volto-newsletter/components/Blocks/NewsletterSubscribe/Sidebar';
import Background from 'volto-newsletter/components/Blocks/NewsletterSubscribe/Background';
import SubscribeButton from 'volto-newsletter/components/Blocks/NewsletterSubscribe/SubscribeButton';
import './NewsletterSubscribe.scss';

const messages = defineMessages({
  text: {
    id: 'Insert text…',
    defaultMessage: 'Insert text…',
  },
  selectChannel: {
    id: 'Newsletter Block: Select a channel from right sidebar',
    defaultMessage: 'Blocco Newsletter Block: Seleziona un canale dalla barra a destra',
  },
  unsubscribable_channel: {
    id: 'Newsletter Block: unsubscribable_channel',
    defaultMessage: 'In canale selezionato non è sottoscrivibile.',
  },
});

const Edit = (props) => {
  const { data, block, selected, ...otherProps } = props;
  const intl = useIntl();
  const { selectedField, setSelectedField } = useHandleDetachedBlockFocus(props, 'text');

  const dispatch = useDispatch();
  const channelID = data.channel?.[0] ? flattenToAppURL(data.channel[0]['@id']) : null;
  const channel = useSelector((state) => state.content.subrequests['channel_' + channelID]?.data);
  console.log(channel);
  useEffect(() => {
    //load channel data
    if (!channel && channelID) {
      dispatch(getContent(channelID, null, 'channel_' + channelID));
    }
  }, [data.channel]);

  return (
    <>
      {channel && channel.is_subscribable ? (
        <div className="public-ui" tabIndex="-1">
          <Background data={data}>
            <Container className="px-md-4 block-text-content">
              <div className="title">
                <TextEditorWidget
                  {...otherProps}
                  data={data}
                  fieldName="title"
                  selected={selectedField === 'title'}
                  block={block}
                  placeholder={intl.formatMessage(messages.text)}
                  setSelected={setSelectedField}
                  focusNextField={() => {
                    setSelectedField('text');
                  }}
                />
              </div>
              <div className="text">
                <TextEditorWidget
                  {...otherProps}
                  showToolbar={true}
                  data={data}
                  block={block}
                  fieldName="text"
                  selected={selectedField === 'text'}
                  placeholder={intl.formatMessage(messages.text)}
                  setSelected={setSelectedField}
                  focusPrevField={() => {
                    setSelectedField('title');
                  }}
                />
              </div>
              <SubscribeButton channel={channel} data={data} inEditMode={true} />
            </Container>
          </Background>
        </div>
      ) : channel && !channel.is_subscribable ? (
        <div className="edit-infos">{intl.formatMessage(messages.unsubscribable_channel)}</div>
      ) : (
        <div className="edit-infos">{intl.formatMessage(messages.selectChannel)}</div>
      )}
      <SidebarPortal selected={selected}>
        <Sidebar {...props} />
      </SidebarPortal>
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Edit.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
};

export default Edit;
