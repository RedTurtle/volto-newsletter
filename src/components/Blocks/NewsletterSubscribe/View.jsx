import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Container } from 'design-react-kit';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import { flattenToAppURL } from '@plone/volto/helpers';
import { getContent } from '@plone/volto/actions';
import { checkRichTextHasContent } from 'design-comuni-plone-theme/helpers';
import Background from 'volto-newsletter/components/Blocks/NewsletterSubscribe/Background';
import SubscribeButton from 'volto-newsletter/components/Blocks/NewsletterSubscribe/SubscribeButton';

import './NewsletterSubscribe.scss';

const View = ({ data, id }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const channelID = data.channel?.[0] ? flattenToAppURL(data.channel[0]['@id']) : null;
  const channel = useSelector((state) => state.content.subrequests['channel_' + channelID]?.data);

  useEffect(() => {
    //load channel data
    if (!channel && channelID) {
      dispatch(getContent(channelID, null, 'channel_' + channelID));
    }
  }, [data.channel]);

  return channel && channel.is_subscribable ? (
    <div className="block newsletter-subscribe">
      <div className="public-ui">
        <Background data={data}>
          <Container className="px-md-4 block-text-content">
            {checkRichTextHasContent(data.title) && (
              <div className="title">
                <TextBlockView data={{ value: data.title }} />
              </div>
            )}

            {checkRichTextHasContent(data.text) && (
              <div className="text">
                <TextBlockView data={{ value: data.text }} />
              </div>
            )}

            <SubscribeButton channel={channel} data={data} />
          </Container>
        </Background>
      </div>
    </div>
  ) : (
    <></>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
};

export default View;
