import React from 'react';
import cx from 'classnames';
import { addAppURL, flattenToAppURL } from '@plone/volto/helpers';

const Background = ({ data, children }) => {
  return (
    <div
      className={cx('block-content', {
        'full-width': data.showFullWidth,
        'with-bg': data.background?.[0],
      })}
    >
      {data.background?.[0] && (
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${data.background[0]?.image_field ? flattenToAppURL(data.background[0]['@id'] + '/' + data.background[0].image_scales?.[data.background[0].image_field][0].download) : addAppURL(data.background[0]?.['@id'])})`,
          }}
        ></div>
      )}
      {children}
    </div>
  );
};

export default Background;
