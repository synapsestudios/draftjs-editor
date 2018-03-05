'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _Video = require('../icons/Video');

var _Video2 = _interopRequireDefault(_Video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var youtubeParser = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
var vimeoParser = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/gi;

var EditorVideoBlock = function (_Component) {
  _inherits(EditorVideoBlock, _Component);

  function EditorVideoBlock() {
    _classCallCheck(this, EditorVideoBlock);

    return _possibleConstructorReturn(this, (EditorVideoBlock.__proto__ || Object.getPrototypeOf(EditorVideoBlock)).apply(this, arguments));
  }

  _createClass(EditorVideoBlock, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.block !== this.props.block;
    }
  }, {
    key: 'render',
    value: function render() {
      var entity = _draftJs.Entity.get(this.props.block.getEntityAt(0));

      var _entity$getData = entity.getData(),
          src = _entity$getData.src;

      return _react2.default.createElement('iframe', { src: src, allowFullScreen: true });
    }
  }]);

  return EditorVideoBlock;
}(_react.Component);

EditorVideoBlock.propTypes = {
  block: _propTypes2.default.object
};

exports.default = {
  getBlockRenderer: function getBlockRenderer() {
    return {
      component: EditorVideoBlock,
      editable: false
    };
  },
  getInitialData: function getInitialData() {
    return {
      src: ''
    };
  },
  getLabel: function getLabel() {
    return 'Video';
  },
  getIcon: function getIcon() {
    return _react2.default.createElement(_Video2.default, null);
  },
  renderHTML: function renderHTML(data) {
    return '<iframe src="' + data.src + '" allowFullScreen></iframe>';
  },
  renderInputForm: function renderInputForm(data, onDataChange, onKeyDown, onSubmit) {
    var _this2 = this;

    var updateSrc = function updateSrc(e) {
      onDataChange({
        src: e.target.value
      });
    };

    var transformSource = function transformSource(src) {
      var transformed = src;

      var youtubeId = youtubeParser.exec(src);
      var vimeoId = vimeoParser.exec(src);

      if (youtubeId) {
        transformed = 'https://www.youtube.com/embed/' + youtubeId[1];
      } else if (vimeoId) {
        transformed = 'https://player.vimeo.com/video/' + vimeoId[5] + '?color=c9ff23&title=0&byline=0&portrait=0';
      }

      return transformed;
    };

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', {
        onChange: updateSrc,
        type: 'text',
        value: data.src,
        onKeyDown: onKeyDown,
        placeholder: 'URL',
        ref: function ref(c) {
          _this2.refs.customBlockInput = c;
        }
      }),
      _react2.default.createElement(
        'button',
        {
          onClick: function onClick() {
            return onSubmit({ src: transformSource(data.src) });
          }
        },
        'Confirm'
      )
    );
  }
};