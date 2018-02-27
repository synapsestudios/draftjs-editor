'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var linkStrategy = function linkStrategy(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
};

var Link = function Link(props) {
  var _props$contentState$g = props.contentState.getEntity(props.entityKey).getData(),
      target = _props$contentState$g.target,
      url = _props$contentState$g.url;

  return _react2.default.createElement(
    'a',
    { href: url, target: target },
    props.children
  );
};

Link.propTypes = {
  entityKey: _propTypes2.default.any,
  children: _propTypes2.default.any
};

exports.default = {
  strategy: linkStrategy,
  component: Link
};