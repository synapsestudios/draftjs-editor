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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CustomBlockControls(_ref) {
  var controls = _ref.controls,
      display = _ref.display,
      onClick = _ref.onClick,
      customBlocks = _ref.customBlocks,
      customBlockType = _ref.customBlockType;

  var buttons = [];

  var getClickHandlerForType = function getClickHandlerForType(type) {
    return function () {
      onClick({
        showCustomBlockInput: true,
        customBlockType: type,
        customBlockData: customBlocks[type].getInitialData()
      });
    };
  };

  Object.keys(customBlocks).forEach(function (key) {
    if (customBlocks.hasOwnProperty(key) && controls && controls.indexOf(key) > -1) {
      buttons.push(_react2.default.createElement(_StyleButton2.default, {
        key: key + '-button',
        active: key === customBlockType,
        label: customBlocks[key].getLabel(),
        icon: typeof customBlocks[key].getIcon === 'function' ? customBlocks[key].getIcon() : null,
        onToggle: getClickHandlerForType(key),
        style: ''
      }));
    }
  });

  return _react2.default.createElement(
    'div',
    { className: 'DraftJSEditor-controls', style: { display: display } },
    buttons
  );
}

CustomBlockControls.propTypes = {
  controls: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
  display: _propTypes2.default.oneOf(['block', 'inline']),
  onClick: _propTypes2.default.func,
  customBlocks: _propTypes2.default.object
};

exports.default = CustomBlockControls;