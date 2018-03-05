'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INLINE_CONTROLS = exports.BLOCK_CONTROLS = exports.INLINE_STYLES = exports.BLOCK_TYPES = undefined;
exports.validator = validator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Blockquote = require('./icons/Blockquote');

var _Blockquote2 = _interopRequireDefault(_Blockquote);

var _Bold = require('./icons/Bold');

var _Bold2 = _interopRequireDefault(_Bold);

var _Codeblock = require('./icons/Codeblock');

var _Codeblock2 = _interopRequireDefault(_Codeblock);

var _H = require('./icons/H1');

var _H2 = _interopRequireDefault(_H);

var _H3 = require('./icons/H2');

var _H4 = _interopRequireDefault(_H3);

var _H5 = require('./icons/H3');

var _H6 = _interopRequireDefault(_H5);

var _H7 = require('./icons/H4');

var _H8 = _interopRequireDefault(_H7);

var _H9 = require('./icons/H5');

var _H10 = _interopRequireDefault(_H9);

var _H11 = require('./icons/H6');

var _H12 = _interopRequireDefault(_H11);

var _Italic = require('./icons/Italic');

var _Italic2 = _interopRequireDefault(_Italic);

var _Link = require('./icons/Link');

var _Link2 = _interopRequireDefault(_Link);

var _Monospace = require('./icons/Monospace');

var _Monospace2 = _interopRequireDefault(_Monospace);

var _OrderedList = require('./icons/OrderedList');

var _OrderedList2 = _interopRequireDefault(_OrderedList);

var _Underline = require('./icons/Underline');

var _Underline2 = _interopRequireDefault(_Underline);

var _UnorderedList = require('./icons/UnorderedList');

var _UnorderedList2 = _interopRequireDefault(_UnorderedList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BLOCK_TYPES = exports.BLOCK_TYPES = [{ label: 'H1', style: 'header-one', icon: _react2.default.createElement(_H2.default, null) }, { label: 'H2', style: 'header-two', icon: _react2.default.createElement(_H4.default, null) }, { label: 'H3', style: 'header-three', icon: _react2.default.createElement(_H6.default, null) }, { label: 'H4', style: 'header-four', icon: _react2.default.createElement(_H8.default, null) }, { label: 'H5', style: 'header-five', icon: _react2.default.createElement(_H10.default, null) }, { label: 'H6', style: 'header-six', icon: _react2.default.createElement(_H12.default, null) }, { label: 'UL', style: 'unordered-list-item', icon: _react2.default.createElement(_UnorderedList2.default, null) }, { label: 'OL', style: 'ordered-list-item', icon: _react2.default.createElement(_OrderedList2.default, null) }, { label: 'Blockquote', style: 'blockquote', icon: _react2.default.createElement(_Blockquote2.default, null) }, { label: 'Code Block', style: 'code-block', icon: _react2.default.createElement(_Codeblock2.default, null) }];

var INLINE_STYLES = exports.INLINE_STYLES = [{ label: 'Bold', style: 'BOLD', icon: _react2.default.createElement(_Bold2.default, null) }, { label: 'Italic', style: 'ITALIC', icon: _react2.default.createElement(_Italic2.default, null) }, { label: 'Underline', style: 'UNDERLINE', icon: _react2.default.createElement(_Underline2.default, null) }, { label: 'Monospace', style: 'CODE', icon: _react2.default.createElement(_Monospace2.default, null) }, { label: 'Link', style: 'LINK', icon: _react2.default.createElement(_Link2.default, null) }];

var BLOCK_CONTROLS = exports.BLOCK_CONTROLS = BLOCK_TYPES.map(function (type) {
  return type.label;
});
var INLINE_CONTROLS = exports.INLINE_CONTROLS = INLINE_STYLES.map(function (style) {
  return style.label;
});

function validator(controls) {
  return function (propValue, key, componentName, location, propFullName) {
    var errors = propValue.map(function (value) {
      return controls.indexOf(value) !== -1;
    });
    if (!errors.every(function (error) {
      return !!error;
    })) {
      return new Error('Invalid prop ' + propFullName + ' supplied to ' + componentName);
    }
  };
}