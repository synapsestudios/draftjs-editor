'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _StyleButton = require('./StyleButton');

var _StyleButton2 = _interopRequireDefault(_StyleButton);

var _controls = require('../controls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BlockStyleControls(_ref) {
  var controls = _ref.controls,
      display = _ref.display,
      editorState = _ref.editorState,
      onToggle = _ref.onToggle;

  var selection = editorState.getSelection();
  var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  return _react2.default.createElement(
    'div',
    { className: 'DraftJSEditor-controls', style: { display: display } },
    _controls.BLOCK_TYPES.map(function (type) {
      if (controls.indexOf(type.label) !== -1) {
        return _react2.default.createElement(_StyleButton2.default, {
          key: type.label,
          active: type.style === blockType,
          label: type.label,
          icon: type.icon,
          onToggle: onToggle,
          style: type.style
        });
      }
    })
  );
}

BlockStyleControls.propTypes = {
  controls: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.arrayOf((0, _controls.validator)(_controls.BLOCK_CONTROLS))]),
  display: _propTypes2.default.oneOf(['block', 'inline']),
  editorState: _propTypes2.default.object,
  onToggle: _propTypes2.default.func
};

exports.default = BlockStyleControls;