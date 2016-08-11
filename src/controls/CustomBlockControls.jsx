import React, { PropTypes } from 'react';

import StyleButton from './StyleButton';
import renderers from '../renderers';

function CustomBlockControls({ controls, display, onClick }) {
  let buttons = [];

  const getClickHandlerForType = type => () => {
    onClick({
      showCustomBlockInput: true,
      customBlockType: type,
      customBlockData: renderers[type].getInitialData(),
    });
  };

  Object.keys(renderers).forEach(key => {
    if (renderers.hasOwnProperty(key) && controls && controls.indexOf(key) > -1) {
      buttons.push(
        <StyleButton
          key={`${key}-button`}
          active={false}
          label={renderers[key].getLabel()}
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
  controls: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
  display: React.PropTypes.oneOf(['block', 'inline']),
  onClick: PropTypes.func,
};

export default CustomBlockControls;
