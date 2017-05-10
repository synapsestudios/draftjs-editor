import React from 'react';
import PropTypes from 'prop-types';

import StyleButton from './StyleButton';

function CustomBlockControls({
  controls,
  display,
  onClick,
  customBlocks,
  customBlockType,
}) {
  let buttons = [];

  const getClickHandlerForType = type => () => {
    onClick({
      showCustomBlockInput: true,
      customBlockType: type,
      customBlockData: customBlocks[type].getInitialData(),
    });
  };

  Object.keys(customBlocks).forEach(key => {
    if (
      customBlocks.hasOwnProperty(key) &&
      controls &&
      controls.indexOf(key) > -1
    ) {
      buttons.push(
        <StyleButton
          key={`${key}-button`}
          active={key === customBlockType}
          label={customBlocks[key].getLabel()}
          icon={
            typeof customBlocks[key].getIcon === 'function'
              ? customBlocks[key].getIcon()
              : null
          }
          onToggle={getClickHandlerForType(key)}
          style={''}
        />
      );
    }
  });

  return (
    <div className="DraftJSEditor-controls" style={{ display }}>
      {buttons}
    </div>
  );
}

CustomBlockControls.propTypes = {
  controls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  display: PropTypes.oneOf(['block', 'inline']),
  onClick: PropTypes.func,
  customBlocks: PropTypes.object,
};

export default CustomBlockControls;
