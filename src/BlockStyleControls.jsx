import React, { PropTypes } from 'react';
import StyleButton from './StyleButton';

import { BLOCK_CONTROLS, BLOCK_TYPES, validator } from './controls';

function BlockStyleControls({ controls, display, editorState, onToggle }) {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="DraftJSEditor-controls" style={{ display }}>
      {BLOCK_TYPES.map(
        type => {
          if (controls.indexOf(type.label) !== -1) {
            return (
              <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={onToggle}
                style={type.style}
              />
            );
          }
        }
      )}
    </div>
  );
}

BlockStyleControls.propTypes = {
  controls: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.arrayOf(validator(BLOCK_CONTROLS)),
  ]),
  display: React.PropTypes.oneOf(['block', 'inline']),
  editorState: PropTypes.object,
  onToggle: PropTypes.func,
};

export default BlockStyleControls;
