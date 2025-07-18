import config from '@plone/volto/registry';
import qs from 'query-string';

const allowedMessageBlocks = ['slate', 'image', 'gridBlock'];

const MessageFilterBlocks = () => {
  let newBlocksConfig = {};
  for (const [blockId, blockConfig] of Object.entries(
    config.blocks.blocksConfig,
  )) {
    const defaultRestricted = blockConfig.restricted;
    newBlocksConfig[blockId] = {
      ...blockConfig,
      restricted: ({ block, properties }) => {
        if (__CLIENT__) {
          const type =
            properties['@type'] || qs.parse(window.location.search).type;
          if (type === 'Message') {
            // filter allowed blocks
            return !allowedMessageBlocks.includes(block.id);
          }
        }
        return typeof defaultRestricted === 'function'
          ? defaultRestricted({ block, properties })
          : blockConfig.restricted;
      },
    };
  }
  config.blocks.blocksConfig = newBlocksConfig;
  return <></>;
};

export default MessageFilterBlocks;
