const allowedMessageBlocks = ['slate', 'image', 'gridBlock'];

const restrictedCTMessage = ({ block, properties, contentType }) => {
  const type = properties['@type'] ?? contentType;

  if (type === 'Message') {
    // filter allowed blocks
    return !allowedMessageBlocks.includes(block.id);
  }
  null;
};

const setRestricted = (config) => {
  Object.keys(config.blocks.blocksConfig).forEach((block_id) => {
    const defaultRestricted = config.blocks.blocksConfig[block_id].restricted;
    config.blocks.blocksConfig[block_id].__defaultRestrictedNL =
      defaultRestricted;

    config.blocks.blocksConfig[block_id].restricted = ({
      block,
      properties,
      contentType,
    }) => {
      const restricted = restrictedCTMessage({
        block,
        properties,
        contentType,
      });

      if (restricted == null) {
        const _default =
          config.blocks.blocksConfig[block_id].__defaultRestrictedNL;

        return typeof _default === 'function'
          ? _default({ block, properties, contentType })
          : _default;
      }
      return restricted;
    };
  });
};

export { setRestricted };
