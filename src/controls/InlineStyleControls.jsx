import React from 'react';
import PropTypes from 'prop-types';
import StyleButton from './StyleButton';

import { INLINE_CONTROLS, INLINE_STYLES, validator } from '../controls';

function InlineStyleControls({ controls, display, editorState, onToggle }) {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="DraftJSEditor-controls" style={{ display }}>
      {INLINE_STYLES.map(type => {
        if (controls.indexOf(type.label) !== -1) {
          return (
            <StyleButton
              key={type.label}
              active={currentStyle.has(type.style)}
              label={type.label}
              icon={type.icon}
              onToggle={onToggle}
              style={type.style}
            />
          );
        }
      })}
    </div>
  );
}

InlineStyleControls.propTypes = {
  controls: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(validator(INLINE_CONTROLS)),
  ]),
  display: PropTypes.oneOf(['block', 'inline']),
  editorState: PropTypes.object,
  onToggle: PropTypes.func,
};

export default InlineStyleControls;
