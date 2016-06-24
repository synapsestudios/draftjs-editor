import React, { PropTypes } from 'react';
import StyleButton from './StyleButton';

import { INLINE_CONTROLS, INLINE_STYLES, validator } from './controls';

function InlineStyleControls({ controls, editorState, onToggle }) {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="DraftJSEditor-controls">
      {INLINE_STYLES.map(
        type => {
          if (controls.indexOf(type.label) !== -1) {
            return (
              <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
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

InlineStyleControls.propTypes = {
  controls: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.arrayOf(validator(INLINE_CONTROLS)),
  ]),
  editorState: PropTypes.object,
  onToggle: PropTypes.func,
};

export default InlineStyleControls;
